import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  cleaningStandardDateAtom,
  readCleaningStatusListSelector,
} from '@state/cleaningManagement/cleaningStatus'
import { currentAccommodationAtom } from '@state/common/common'
import { readMemberListSelector } from '@state/company/company'
import { updateCleaningStatusSelector } from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { addDays } from 'date-fns'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function WorkerSelectBox({ cleaning, cleaningStatusParameter }) {
  const updateCleaningStatusCallback = useApiCallback('updateCleaningStatus')
  const { acNo } = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(cleaningStandardDateAtom)

  const readCleaningStatusListParameter = {
    acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const resetReadCleaningStatusList = useRecoilRefresher_UNSTABLE(
    readCleaningStatusListSelector(readCleaningStatusListParameter)
  )
  const { cpNo } = loadItem('user')
  const {
    data: { data: memberList },
  } = useRecoilValue(readMemberListSelector({ cpNo }))
  console.log(memberList)

  const handleChange = (event) => {
    const workerId = event.target.value
    const workerName = memberList.find((member) => member.mbId === workerId).name
    if (workerId === '0') {
      return
    } else {
      const updateCleaningStatusParameter = {
        ...cleaningStatusParameter,
        workerId,
        workerName,
      }
      updateCleaningStatusCallback(
        updateCleaningStatusSelector(getFormDataFromJson(updateCleaningStatusParameter))
      ).then((result) => {
        console.log(result)
        const { message } = result
        if (message === '성공') {
          resetReadCleaningStatusList()
          alert('저장되었습니다.')
        }
      })
    }
  }
  return (
    <select defaultValue={cleaning?.workerId} onChange={handleChange}>
      <option value={'0'}>담당자선택</option>
      {memberList.map(
        (member) =>
          member.role === '05' && (
            <option key={member.mbNo} value={member.mbId}>
              {member.name}
            </option>
          )
      )}
    </select>
  )
}
