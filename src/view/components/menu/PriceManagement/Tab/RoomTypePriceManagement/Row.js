import { priceManagementTabAtom } from '@state/priceManagement/common'
import { currentPeriodPriceManagementRoomTypeAtom } from '@state/priceManagement/periodPriceManagement'
import { useSetRecoilState } from 'recoil'

export default function RoomTypePriceManagementRow({ roomType, register }) {
  //두개를 바꾸면된다 roomTypeSelect의 상태를 지금 받은걸로 바꾸고
  const setRoomType = useSetRecoilState(currentPeriodPriceManagementRoomTypeAtom)
  const setCurrentTab = useSetRecoilState(priceManagementTabAtom)
  //tab상태를 바꾸면된다
  const {
    rtNo,
    roomTypeName,
    originPrice,
    salePrice,
    providePrice,
    addAdultPrice,
    addChildPrice,
    addInfantPrice,
  } = roomType

  const goPeriodPrice = () => {
    setRoomType(roomType)
    setCurrentTab('periodPriceManagement')
  }
  return (
    <tr>
      <td className='bg'>{roomTypeName}</td>
      <td>
        <div className='n-input'>
          <input
            type='number'
            defaultValue={Number(originPrice)}
            {...register(`originPrice${rtNo}`)}
          />
          <span>원</span>
        </div>
      </td>
      <td>
        <div className='n-input'>
          <input type='number' defaultValue={Number(salePrice)} {...register(`salePrice${rtNo}`)} />
          <span>원</span>
        </div>
      </td>
      <td>
        <div className='n-input'>
          <input
            type='number'
            defaultValue={Number(providePrice)}
            {...register(`providePrice${rtNo}`)}
          />
          <span>원</span>
        </div>
      </td>
      <td>
        <div className='n-input'>
          <input
            type='number'
            defaultValue={Number(addAdultPrice)}
            {...register(`addAdultPrice${rtNo}`)}
          />
          <span>원</span>
        </div>
      </td>
      <td>
        <div className='n-input'>
          <input
            type='number'
            defaultValue={Number(addChildPrice)}
            {...register(`addChildPrice${rtNo}`)}
          />
          <span>원</span>
        </div>
      </td>
      <td>
        <div className='n-input'>
          <input
            type='number'
            defaultValue={Number(addInfantPrice)}
            {...register(`addInfantPrice${rtNo}`)}
          />
          <span>원</span>
        </div>
      </td>
      <td className='center'>
        <a href='#' className='make' onClick={goPeriodPrice}>
          객실요금설정
        </a>
      </td>
    </tr>
  )
}
