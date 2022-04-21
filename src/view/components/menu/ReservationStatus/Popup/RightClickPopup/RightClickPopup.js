import { updateReservationStatus } from '@api/reservationStatus/reservationStatus'
import { CLEANING_STATUS, RESERVE_STATUS } from '@constant/constantVariable'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
import { standardDateAtom } from '@state/reservation'
import {
  lockRoomSelector,
  readReservationPriceSelector,
  rightClickPopupAtom,
  unlockRoomSelector,
  updateCleaningStatusSelector,
  updateReservationStatusSelector,
} from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'

export default function RightClickPopUp() {
  const lockRoomCallback = useApiCallback('lockRoom')
  const unlockRoomCallback = useApiCallback('unlockRoom')
  const checkOutCallback = useApiCallback('checkOut')
  const checkinCallback = useApiCallback('checkOut')
  const updateCleaningStatusCallback = useApiCallback('updateCleaningStatus')

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const parameter = {
    acNo: accommodation?.acNo,
    startDate: formatyyyyMMddWithHyphen(addDays(standardDate, -5)),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )
  const [rightClickPopupProperty, setRightClickPopupProperty] = useRecoilState(rightClickPopupAtom)

  const lockRoom = () => {
    const { rmNo, currentDate } = rightClickPopupProperty
    const isConfirm = window.confirm('객실을 잠그시겠습니까?')

    if (isConfirm) {
      lockRoomCallback(lockRoomSelector(getFormDataFromJson({ rmNo, lockDate: currentDate }))).then(
        (result) => {
          const { message } = result
          if (message === '성공') {
            resetReadReservationPrice()
            // alert('객실이 잠겼습니다.')
          }
        }
      )
    }
  }
  const unlockRoom = () => {
    const { rmNo, currentDate } = rightClickPopupProperty
    const isConfirm = window.confirm('객실 잠금을 해제하시겠습니까?')

    if (isConfirm) {
      unlockRoomCallback(
        unlockRoomSelector(getFormDataFromJson({ rmNo, lockDate: currentDate }))
      ).then((result) => {
        const { message } = result
        if (message === '성공') {
          resetReadReservationPrice()
          // alert('객실이 잠금해제되었습니다.')
        }
      })
    }
  }
  const checkOut = () => {
    const rrNo = rightClickPopupProperty?.rrNo
    const reserveStatus = RESERVE_STATUS.CHECKOUT
    checkOutCallback(
      updateReservationStatusSelector(getFormDataFromJson({ rrNo, reserveStatus }))
    ).then((result) => {
      const { message } = result
      if (message === '저장되었습니다.') {
        resetReadReservationPrice()
        alert('저장되었습니다.')
      }
    })
  }

  const checkIn = () => {
    const rrNo = rightClickPopupProperty?.rrNo
    const reserveStatus = RESERVE_STATUS.CHECKIN
    checkinCallback(
      updateReservationStatusSelector(getFormDataFromJson({ rrNo, reserveStatus }))
    ).then((result) => {
      const { message } = result
      if (message === '저장되었습니다.') {
        resetReadReservationPrice()
        alert('저장되었습니다.')
      }
    })
  }
  const cancel = () => {
    const rrNo = rightClickPopupProperty?.rrNo
    const reserveStatus = RESERVE_STATUS.CALCEL
    checkinCallback(
      updateReservationStatusSelector(getFormDataFromJson({ rrNo, reserveStatus }))
    ).then((result) => {
      const { message } = result
      if (message === '저장되었습니다.') {
        resetReadReservationPrice()
        alert('취소되었습니다.')
      }
    })
  }
  // const cleaning = () => {
  //   const rrNo = rightClickPopupProperty?.rrNo
  //   const reserveStatus = RESERVE_STATUS.CLEANING
  //   checkOutCallback(
  //     updateReservationStatusSelector(getFormDataFromJson({ rrNo, reserveStatus }))
  //   ).then((result) => {
  //     const { message } = result
  //     if (message === '저장되었습니다.') {
  //       resetReadReservationPrice()
  //       alert('저장되었습니다.')
  //     }
  //   })
  // }

  const requestCleaning = () => {
    const { rcNo, acNo, rtNo, rmNo, currentDate } = rightClickPopupProperty
    const cleaningStatus = CLEANING_STATUS.REQUEST
    const updateCleaningStatusParameter = {
      rcNo,
      acNo,
      rtNo,
      rmNo,
      workDate: currentDate,
      workerId: '',
      workerName: '',
      cleaningStatus,
    }
    updateCleaningStatusCallback(
      updateCleaningStatusSelector(getFormDataFromJson(updateCleaningStatusParameter))
    ).then((result) => {
      console.log(result)
      const { message } = result
      if (message === '성공') {
        resetReadReservationPrice()
        alert('저장되었습니다.')
      }
    })
  }
  const completeCleaning = () => {
    const { rcNo, acNo, rtNo, rmNo, currentDate } = rightClickPopupProperty
    const cleaningStatus = CLEANING_STATUS.FINISHED
    const updateCleaningStatusParameter = {
      rcNo,
      acNo,
      rtNo,
      rmNo,
      workDate: currentDate,
      workerId: '',
      workerName: '',
      cleaningStatus,
    }
    updateCleaningStatusCallback(
      updateCleaningStatusSelector(getFormDataFromJson(updateCleaningStatusParameter))
    ).then((result) => {
      console.log(result)
      const { message } = result
      if (message === '성공') {
        resetReadReservationPrice()
        alert('저장되었습니다.')
      }
    })
  }

  const closeMenu = () => {
    setRightClickPopupProperty((prev) => ({ ...prev, display: 'none' }))
  }
  return (
    <div className='state-select' style={{ ...rightClickPopupProperty }}>
      <ul>
        <li>
          <a href='#'>예약등록/변경</a>
        </li>
        {rightClickPopupProperty.reservationStatus === 'RESERVECOMPLETE' && (
          <li>
            <a href='#' onClick={cancel}>
              예약취소
            </a>
          </li>
        )}
        {rightClickPopupProperty.reservationStatus === 'RESERVECOMPLETE' && (
          <li>
            <a href='#' onClick={checkIn}>
              입실
            </a>
          </li>
        )}
        {rightClickPopupProperty.reservationStatus === 'CHECKIN' && (
          <li>
            <a href='#' onClick={checkOut}>
              퇴실
            </a>
          </li>
        )}
        {rightClickPopupProperty.hideLock && (
          <>
            {rightClickPopupProperty.isLocked ? (
              <li>
                <a href='#' onClick={unlockRoom}>
                  객실잠금해제
                </a>
              </li>
            ) : (
              <li>
                <a href='#' onClick={lockRoom}>
                  객실잠금
                </a>
              </li>
            )}
          </>
        )}
        {rightClickPopupProperty.isCleaning ? (
          <li>
            <a href='#' onClick={completeCleaning}>
              청소완료
            </a>
          </li>
        ) : (
          <li>
            <a href='#' onClick={requestCleaning}>
              청소요청
            </a>
          </li>
        )}
        <li>
          <a href='#' onClick={closeMenu}>
            메뉴닫기
          </a>
        </li>
      </ul>
    </div>
  )
}
