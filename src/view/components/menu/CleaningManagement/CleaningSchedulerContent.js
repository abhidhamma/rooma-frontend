import {
  cleaningStandardDateAtom,
  readCleaningStatusListSelector,
} from '@state/cleaningManagement/cleaningStatus'
import { currentAccommodationAtom } from '@state/common/common'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns'
import { useRecoilValue } from 'recoil'
import RoomType from './RoomType'

export default function CleaningSchedulerContent() {
  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(cleaningStandardDateAtom)

  const parameter = {
    acNo: accommodation?.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const data = useRecoilValue(readCleaningStatusListSelector(parameter))

  //지역변수
  const roomTypeList = data?.data?.data === null ? [] : data.data.data.roomTypes
  const roomTypeListLength = data?.data?.data === null ? 0 : data.data.data.roomTypes.length
  console.log(roomTypeList)
  return (
    <>
      {roomTypeList
        .filter((roomType) => roomType.rooms.length !== 0)
        .map((roomType, index) => (
          <RoomType key={index} roomType={roomType} />
        ))}
    </>
  )
}
