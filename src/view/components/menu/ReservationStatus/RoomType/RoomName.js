import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import {
  lockRoomSelector,
  readReservationPriceSelector,
} from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns/fp'
import _ from 'lodash/fp'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RoomName({ room, rmNo }) {
  const lockRoomCallback = useApiCallback('lockRoom')
  const unlockRoomCallback = useApiCallback('unlockRoom')

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const dayCount = useRecoilValue(dayCountAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  console.log(dayCount, standardDate)

  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(29)(standardDate)),
  }

  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  const mapDate = _.map((number) => formatyyyyMMddWithHyphen(addDays(number)(standardDate)))
  const joinComma = _.join(',')
  const makeLockDateString = _.flow(_.range(0), mapDate, joinComma)
  const lockDateString = makeLockDateString(dayCount)
  console.log(lockDateString)

  const handleAllLock = () => {
    lockRoomCallback(
      lockRoomSelector(getFormDataFromJson({ rmNo, lockDate: lockDateString }))
    ).then((result) => {
      const { message } = result
      if (message === '성공') {
        resetReadReservationPrice()
        alert('객실이 잠겼습니다.')
      }
    })
  }
  return (
    <div>
      <a href='#' className='key unlock' onClick={handleAllLock}>
        <span className='hidden'>잠금/해제</span>
      </a>
      <span>{room.rmName}</span>
    </div>
  )
}
