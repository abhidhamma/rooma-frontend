import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
import { standardDateAtom } from '@state/reservation'
import {
  lockRoomSelector,
  readReservationPriceSelector,
  rightClickPopupAtom,
  unlockRoomSelector,
} from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RightClickPopUp() {
  const lockRoomCallback = useApiCallback('lockRoom')
  const unlockRoomCallback = useApiCallback('unlockRoom')

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )
  const rightClickPopupProperty = useRecoilValue(rightClickPopupAtom)
  const lockRoom = () => {
    const { rmNo, lockDate } = rightClickPopupProperty
    const isConfirm = window.confirm('객실을 잠그시겠습니까?')

    if (isConfirm) {
      lockRoomCallback(lockRoomSelector(getFormDataFromJson({ rmNo, lockDate }))).then((result) => {
        const { message } = result
        if (message === '성공') {
          resetReadReservationPrice()
          // alert('객실이 잠겼습니다.')
        }
      })
    }
  }
  const unlockRoom = () => {
    const { rmNo, lockDate } = rightClickPopupProperty
    const isConfirm = window.confirm('객실 잠금을 해제하시겠습니까?')

    if (isConfirm) {
      unlockRoomCallback(unlockRoomSelector(getFormDataFromJson({ rmNo, lockDate }))).then(
        (result) => {
          const { message } = result
          if (message === '성공') {
            resetReadReservationPrice()
            // alert('객실이 잠금해제되었습니다.')
          }
        }
      )
    }
  }
  return (
    <div className='state-select' style={{ ...rightClickPopupProperty }}>
      <ul>
        <li>
          <a href='#'>예약등록/변경</a>
        </li>
        <li>
          <a href='#'>입실</a>
        </li>
        <li>
          <a href='#'>퇴실</a>
        </li>
        {rightClickPopupProperty.hideLock && (
          <>
            <li>
              <a href='#' onClick={lockRoom}>
                객실잠금
              </a>
            </li>
            <li>
              <a href='#' onClick={unlockRoom}>
                객실잠금해제
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
