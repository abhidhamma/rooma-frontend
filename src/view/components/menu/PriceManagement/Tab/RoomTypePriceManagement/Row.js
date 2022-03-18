export default function RoomTypePriceManagementRow({ roomType, register }) {
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
        <a href='#' className='make'>
          객실요금설정
        </a>
      </td>
    </tr>
  )
}
