import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import {
  lockRoomSelector,
  readReservationPriceSelector,
  unlockRoomSelector,
} from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns/fp'
import _ from 'lodash/fp'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RoomName({ rtName, room, rmNo, reservationList, lockedRoomList }) {
  console.log('RoomName called...', rtName, room.rmName, rmNo)
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

  if (rmNo === '23') {
    console.log(`${room.rmName}!`)
    console.log(reservationList)
    console.log(lockedRoomList)
  }
  const formatDate = _.map((number) => formatyyyyMMddWithHyphen(addDays(number)(standardDate)))
  const filterReservationDate = _.filter(
    (date) => reservationList.find((reservation) => reservation.checkinDate === date) === undefined
  )
  const joinComma = _.join(',')
  const makeLockDateString = _.flow(_.range(0), formatDate, filterReservationDate, joinComma)
  const lockDateString = makeLockDateString(dayCount)
  console.log(lockDateString)

  const makeLockAbleDateArray = _.flow(_.range(0), formatDate, filterReservationDate)
  const lockAbleDateArray = makeLockAbleDateArray(dayCount)
  const formatLockedRoomList = _.map((lockedRoom) => lockedRoom.lockDate)
  const lockedRoomArray = formatLockedRoomList(lockedRoomList)
  const minus = lockAbleDateArray.length - lockedRoomArray.length

  let isAllLocked = false
  if (minus === 0) {
    isAllLocked = true
  } else if (minus > 0) {
    isAllLocked = false
  } else {
    isAllLocked = true
  }

  console.log(lockAbleDateArray)
  console.log(lockedRoomArray)
  console.log(isAllLocked)

  const handleAllLock = () => {
    if (isAllLocked) {
      unlockRoomCallback(
        unlockRoomSelector(getFormDataFromJson({ rmNo, lockDate: lockDateString }))
      ).then((result) => {
        const { message } = result
        if (message === '성공') {
          resetReadReservationPrice()
          alert('객실이 잠금해제 되었습니다')
        }
      })
    } else {
      lockRoomCallback(
        lockRoomSelector(getFormDataFromJson({ rmNo, lockDate: lockDateString }))
      ).then((result) => {
        const { message } = result
        if (message === '성공') {
          resetReadReservationPrice()
          alert('객실이 잠겼습니다')
        }
      })
    }
  }

  //이제 두가지 남았다
  //전부다 잠겨있는지 체크하고 lock로 css바꾸는 로직
  //지금해보자!
  return (
    <div>
      <a href='#' className={isAllLocked ? 'key lock' : 'key unlock'} onClick={handleAllLock}>
        <span className='hidden'>잠금/해제</span>
      </a>
      <span>{room.rmName}</span>
    </div>
  )
}
