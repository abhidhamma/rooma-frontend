import useApiCallback from '@hook/apiHook/useApiCallback'
import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { currentAccommodationAtom } from '@state/common/common'
import { updateRoomTypePricesSelector } from '@state/priceManagement/roomTypePriceManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import RoomTypePriceManagementRow from './Row'

export default function RoomTypePriceManagement({ isRoomTypePriceManagementTab }) {
  console.log('RoomTypePriceManagement')
  const updateRoomTypePricesCallback = useApiCallback('updateRoomTypePrices')
  const currentAccommodation = useRecoilValue(currentAccommodationAtom)
  console.log(currentAccommodation)

  const data = {
    cpNo: '1',
    roomTypeName: '',
    startRow: '0',
    rowCount: '999',
  }
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readRoomTypeListSelector(getFormDataFromJson(data)))
  console.log(list)

  const { register, handleSubmit } = useForm()

  const rtNoArray = list.map((roomType) => roomType.rtNo)
  const onSubmit = _.flow(
    makeSubmitData(rtNoArray),
    updateRoomTypePrices(updateRoomTypePricesCallback)
  )

  return (
    <div id='priceTab1' className={`tabcontent ${isRoomTypePriceManagementTab ? 'current' : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='ex-txt'>
          <p>상시 판매되는 요금으로 판매중인 모든 객실에 대해 필수로 설정되어야 합니다.</p>
          <p>
            가격입력 후 <strong>객실요금설정 버튼을 클릭</strong>하시면 기간별 요금 설정 페이지로
            이동됩니다.
          </p>
        </div>
        <table>
          <caption>요일별 요금입력</caption>
          <colgroup>
            <col width='*' />
            <col width='11%' />
            <col width='11%' />
            <col width='11%' />
            <col width='11%' />
            <col width='11%' />
            <col width='11%' />
            <col width='13%' />
          </colgroup>
          <tbody>
            <tr>
              <th rowSpan='2'>객실타입</th>
              <th rowSpan='2'>정상가</th>
              <th rowSpan='2'>할인가(판매가)</th>
              <th rowSpan='2'>입금가(공급가)</th>
              <th colSpan='3'>추가요금</th>
              <th rowSpan='2'>비고</th>
            </tr>
            <tr>
              <th className='bg'>성인</th>
              <th className='bg'>소아</th>
              <th className='bg'>유아</th>
            </tr>
            {list.map((roomType) => (
              <RoomTypePriceManagementRow
                register={register}
                roomType={roomType}
                key={roomType.rtNo}
              />
            ))}
          </tbody>
        </table>
        <div className='center mgt_20'>
          <button type='submit' className='btn purple btn-middle'>
            객실타입별 요금저장
          </button>
        </div>
      </form>
    </div>
  )
}
const makeSubmitData = (rtNoArray) => (submitData) => {
  let tempSubmitData = { acNo: '1' }
  let roomTypes = []

  const eachRoomTypes = _.each((rtNo) => {
    const originPrice = submitData[`originPrice${rtNo}`]
    const salePrice = submitData[`salePrice${rtNo}`]
    const providePrice = submitData[`providePrice${rtNo}`]
    const addAdultPrice = submitData[`addAdultPrice${rtNo}`]
    const addChildPrice = submitData[`addChildPrice${rtNo}`]
    const addInfantPrice = submitData[`addInfantPrice${rtNo}`]
    roomTypes = [
      ...roomTypes,
      {
        rtNo,
        originPrice,
        salePrice,
        providePrice,
        addAdultPrice,
        addChildPrice,
        addInfantPrice,
      },
    ]
  })
  eachRoomTypes(rtNoArray)
  tempSubmitData = { ...tempSubmitData, roomTypes }
  return tempSubmitData
}

const updateRoomTypePrices = (updateRoomTypePricesCallback) => (submitData) => {
  updateRoomTypePricesCallback(updateRoomTypePricesSelector(submitData)).then((data) => {
    const { message } = data
    if (message === '업데이트 성공') {
      alert('저장되었습니다.')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
