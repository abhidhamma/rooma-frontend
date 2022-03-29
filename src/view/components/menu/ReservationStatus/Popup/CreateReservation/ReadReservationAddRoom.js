import RoomSelect from '@components/common/RoomSelect'
import { currentAccommodationAtom } from '@state/common/common'
import { createReservationAtom } from '@state/reservationStatus/createReservation'
import { addReserverationRoomCountAtom } from '@state/reservationStatus/reservationStatus'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { formatMoney, zeroOrNumber } from '@util/common/others'
import parseCustomData from '@util/parse/parse'
import { addDays } from 'date-fns'
import _ from 'lodash'
import { Suspense, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import AddRoomTypeSelect from './common/RoomTypeSelect'

export default function ReadReservationAddRoom({
  cancelButton,
  register,
  watch,
  count,
  getValues,
  setRoomPrices,
  setAddPersonPrices,
  setOptionPrices,
  setTotalPrices,
  setRmNoObject,
  reset,
  roomReservation,
}) {
  console.log('CreateReservationAddRoom')
  const parseRoomReservation = () => {
    const { addPersionCon, addBreakfastCon } = roomReservation
    const addPersonArray = addPersionCon.split(',')
    const addBreakfastArray = addBreakfastCon.split(',')
    const getPersonCount = (data) => data.split(':')[1]
    const adult = getPersonCount(addPersonArray[0])
    const child = getPersonCount(addPersonArray[1])
    const infant = getPersonCount(addPersonArray[2])
    const adultBreakfast = getPersonCount(addBreakfastArray[0])
    const childBreakfast = getPersonCount(addBreakfastArray[1])
    const infantBreakfast = getPersonCount(addBreakfastArray[2])
    return { adult, child, infant, adultBreakfast, childBreakfast, infantBreakfast }
  }
  const { adult, child, infant, adultBreakfast, childBreakfast, infantBreakfast } =
    parseRoomReservation()

  console.log('추가요금들')
  console.log(adult, child, infant, adultBreakfast, childBreakfast, infantBreakfast)

  //전역상태
  const setRoomCount = useSetRecoilState(addReserverationRoomCountAtom)
  const [createReservation, setCreateReservation] = useRecoilState(createReservationAtom)
  const accommodation = useRecoilValue(currentAccommodationAtom)
  console.log(accommodation)

  //지역상태
  const [open, setOpen] = useState(false)
  const [room, setRoom] = useState({ rmNo: roomReservation.rmNo })
  const [roomType, setRoomType] = useState({
    basicPersionNum: 2,
    maxPersionNum: 4,
    originPrice: 0,
    addAdultPrice: 0,
    addChildPrice: 0,
    addInfantPrice: 0,
    rtNo: roomReservation.rtNo,
  })
  console.log('firstRoomType')
  console.log(roomType)
  console.log(room)

  //변수
  console.log('ReadReservationAddRoom roomReservation')
  console.log(roomReservation)
  const startDate = roomReservation.checkinDate
  const endDate = roomReservation.checkoutDate

  const { addBreakfastFee, addExtFee } = accommodation
  const {
    basicPersionNum,
    maxPersionNum,
    originPrice,
    addAdultPrice,
    addChildPrice,
    addInfantPrice,
  } = roomType
  const rmNo = room?.rmNo

  const breakfastFeeObject = Object.entries(parseCustomData(addBreakfastFee))
  const breakfastFeeObjectLength = breakfastFeeObject.length

  const extFeeObject = Object.entries(parseCustomData(addExtFee))
  const extFeeObjectLength = extFeeObject.length

  const adultCount = zeroOrNumber(watch(`adultCount${count}`))
  const childCount = zeroOrNumber(watch(`childCount${count}`))
  const infantCount = zeroOrNumber(watch(`infantCount${count}`))
  const adultBreakFastCount = zeroOrNumber(watch(`adultBreakfastCount${count}`))
  const childBreakFastCount = zeroOrNumber(watch(`childBreakfastCount${count}`))
  const infantBreakFastCount = zeroOrNumber(watch(`infantBreakfastCount${count}`))
  const addtionalOption1Count = zeroOrNumber(watch(`additionalOption1Count${count}`))
  const addtionalOption2Count = zeroOrNumber(watch(`additionalOption2Count${count}`))
  const addtionalOption3Count = zeroOrNumber(watch(`additionalOption3Count${count}`))

  const addPersonFee =
    Number(addAdultPrice) * adultCount +
    Number(addChildPrice) * childCount +
    Number(addInfantPrice) * infantCount
  const breakFastFee = calculateTotalBreakFastFee(
    breakfastFeeObject,
    adultBreakFastCount,
    childBreakFastCount,
    infantBreakFastCount
  )

  const additionalOptionFee = calculateTotalAdditionalOptionFee(
    extFeeObject,
    addtionalOption1Count,
    addtionalOption2Count,
    addtionalOption3Count
  )
  const optionFee = addPersonFee + breakFastFee + additionalOptionFee
  const roomTotalFee = Number(originPrice) + Number(optionFee)

  //추가인원으로 등록가능한 총 숫자
  const addPersonLimit = maxPersionNum - basicPersionNum

  //요금 계산용 필드
  const roomFee = Number(originPrice)
  const optionWithoutAddPersonFee = breakFastFee + additionalOptionFee

  const handleToggle = () => setOpen((prev) => !prev)
  const decreaseRoomCount = () => setRoomCount((prev) => prev - 1)

  useEffect(() => {
    setRoomType((prev) => ({ ...prev, rtNo: roomReservation.rtNo }))
  }, [])
  useEffect(() => {
    setRoomPrices((prev) => ({ ...prev, [`roomFee${count}`]: roomFee }))
  }, [roomType])
  useEffect(() => {
    setAddPersonPrices((prev) => ({ ...prev, [`addPersonFee${count}`]: addPersonFee }))
  }, [addPersonFee])
  useEffect(() => {
    setOptionPrices((prev) => ({ ...prev, [`optionFee${count}`]: optionWithoutAddPersonFee }))
  }, [optionWithoutAddPersonFee])
  useEffect(() => {
    setTotalPrices((prev) => ({ ...prev, [`roomTotalFee${count}`]: roomTotalFee }))
  }, [roomTotalFee])
  useEffect(() => {
    setRmNoObject((prev) => ({ ...prev, [`${count}`]: rmNo }))
    return () => {
      setRmNoObject((prev) => _.omit(prev, `${count}`))
    }
  }, [rmNo])
  useEffect(() => {
    reset({ ...getValues(), [`stayNum${count}`]: basicPersionNum })
  }, [basicPersionNum])
  return (
    <section className='add-group'>
      <input type={'hidden'} {...register(`roomFee${count}`)} value={Number(roomFee)} />
      <input type={'hidden'} {...register(`addPersonFee${count}`)} value={Number(addPersonFee)} />
      <input
        type={'hidden'}
        {...register(`optionFee${count}`)}
        value={Number(optionWithoutAddPersonFee)}
      />
      <input type={'hidden'} {...register(`roomTotalFee${count}`)} value={Number(roomTotalFee)} />
      <div className='top-btn'>
        <a href='#' className={open ? 'close' : 'close open'} onClick={handleToggle}>
          <span className='hidden'>옵션 정보 열기/닫기</span>
        </a>
        {!cancelButton && (
          <a href='#' className='cancle' onClick={decreaseRoomCount}>
            취소
          </a>
        )}
      </div>
      <h3>예약객실정보</h3>
      <table className='tbl-pop'>
        <caption>예약객실정보</caption>
        <colgroup>
          <col width='22%' />
          <col width='22%' />
          <col width='13%' />
          <col width='13%' />
          <col width='15%' />
          <col width='15%' />
        </colgroup>
        <thead>
          <tr>
            <th>객실타입</th>
            <th>객실명</th>
            <th colSpan='2'>입실일 ~ 퇴실일</th>
            <th>인원(기본/최대)</th>
            <th>객실요금</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Suspense
                fallback={
                  <select>
                    <option></option>
                  </select>
                }
              >
                <AddRoomTypeSelect roomType={roomType} setRoomType={setRoomType} />
              </Suspense>
            </td>
            <td>
              <Suspense
                fallback={
                  <select>
                    <option></option>
                  </select>
                }
              >
                <RoomSelect
                  roomType={roomType}
                  room={room}
                  setRoom={setRoom}
                  defaultRtNo={roomReservation.rtNo}
                />
              </Suspense>
            </td>
            <td colSpan='2'>
              <div className='term'>
                <span>{startDate}</span>
                <span className='day'>1박</span>
                <span>{endDate}</span>
              </div>
            </td>
            <td>
              <div className='dF-s'>
                <select {...register(`stayNum${count}`)} defaultValue={String(basicPersionNum)}>
                  {numberToArray(maxPersionNum).map((number) => (
                    <option key={number} value={number}>{`${number}명`}</option>
                  ))}
                </select>
                <span className='num'>{`(${basicPersionNum}/${maxPersionNum})`}</span>
              </div>
            </td>
            <td>{`${formatMoney(originPrice)}원`}</td>
          </tr>
        </tbody>
      </table>
      <div className='hidden-area' style={{ display: open ? 'block' : 'none' }}>
        <h3 className='mgt_30'>예약옵션정보</h3>
        <table className='tbl-pop'>
          <caption>예약옵션정보</caption>
          <colgroup>
            <col width='22%' />
            <col width='22%' />
            <col width='26%' />
            <col width='15%' />
            <col width='15%' />
          </colgroup>
          <thead>
            <tr>
              <th>인원추가</th>
              <th>조식추가</th>
              <th>옵션추가</th>
              <th>옵션합계</th>
              <th>요금합계</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='dF-s'>
                  <span className='num'>성인</span>
                  <select {...register(`adultCount${count}`)} defaultValue={adult}>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  {breakfastFeeObjectLength > 0 ? (
                    <>
                      <span className='num'>성인</span>
                      <select
                        {...register(`adultBreakfastCount${count}`)}
                        defaultValue={adultBreakfast}
                      >
                        <option value={0}>0명</option>
                        {numberToArray(maxPersionNum).map((number) => (
                          <option key={number} value={number}>{`${number}명`}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span className='num'>제공되는 조식이 없습니다.</span>
                  )}
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  {extFeeObjectLength > 0 ? (
                    <>
                      <span className='num'>{extFeeObject[0][0]}</span>
                      <select {...register(`additionalOption1Count${count}`)} defaultValue={0}>
                        <option value={0}>0명</option>
                        {numberToArray(maxPersionNum).map((number) => (
                          <option key={number} value={number}>{`${number}명`}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span className='num'>제공되는 옵션이 없습니다.</span>
                  )}
                </div>
              </td>
              <td rowSpan='3'>{`${formatMoney(optionFee)}원`}</td>
              <td rowSpan='3'>{`${formatMoney(roomTotalFee)}원`}</td>
            </tr>
            <tr>
              <td>
                <div className='dF-s'>
                  <span className='num'>소아</span>
                  <select {...register(`childCount${count}`)} defaultValue={child}>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  {breakfastFeeObjectLength > 1 && (
                    <>
                      <span className='num'>소아</span>
                      <select
                        {...register(`childBreakfastCount${count}`)}
                        defaultValue={childBreakfast}
                      >
                        <option value={0}>0명</option>
                        {numberToArray(maxPersionNum).map((number) => (
                          <option key={number} value={number}>{`${number}명`}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  {extFeeObjectLength > 1 && (
                    <>
                      <span className='num'>{extFeeObject[1][0]}</span>
                      <select {...register(`additionalOption2Count${count}`)} defaultValue={0}>
                        <option value={0}>0명</option>
                        {numberToArray(maxPersionNum).map((number) => (
                          <option key={number} value={number}>{`${number}명`}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='dF-s'>
                  <span className='num'>유아</span>
                  <select {...register(`infantCount${count}`)} defaultValue={infant}>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  {breakfastFeeObjectLength > 2 && (
                    <>
                      <span className='num'>유아</span>
                      <select
                        {...register(`infantBreakfastCount${count}`)}
                        defaultValue={infantBreakfast}
                      >
                        <option value={0}>0명</option>
                        {numberToArray(maxPersionNum).map((number) => (
                          <option key={number} value={number}>{`${number}명`}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  {extFeeObjectLength > 2 && (
                    <>
                      <span className='num'>{extFeeObject[2][0]}</span>
                      <select {...register(`additionalOption3Count${count}`)} defaultValue={0}>
                        <option value={0}>0명</option>
                        {numberToArray(maxPersionNum).map((number) => (
                          <option key={number} value={number}>{`${number}명`}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
const calculateTotalBreakFastFee = (
  breakfastFeeObject,
  adultBreakFastCount,
  childBreakFastCount,
  infantBreakFastCount
) => {
  const breakfastFeeObjectLength = breakfastFeeObject.length
  let sum = 0

  if (breakfastFeeObjectLength === 0) {
    return sum
  }
  if (breakfastFeeObjectLength >= 1) {
    sum += Number(breakfastFeeObject[0][1]) * adultBreakFastCount
  }
  if (breakfastFeeObjectLength >= 2) {
    sum += Number(breakfastFeeObject[1][1]) * childBreakFastCount
  }
  if (breakfastFeeObjectLength >= 3) {
    sum += Number(breakfastFeeObject[2][1]) * infantBreakFastCount
  }
  return sum
}
const calculateTotalAdditionalOptionFee = (
  extFeeObject,
  addtionalOption1Count,
  addtionalOption2Count,
  addtionalOption3Count
) => {
  const extFeeObjectLength = extFeeObject.length
  let sum = 0

  if (extFeeObjectLength === 0) {
    return sum
  }
  if (extFeeObjectLength >= 1) {
    sum += Number(extFeeObject[0][1]) * addtionalOption1Count
  }
  if (extFeeObjectLength >= 2) {
    sum += Number(extFeeObject[1][1]) * addtionalOption2Count
  }
  if (extFeeObjectLength >= 3) {
    sum += Number(extFeeObject[2][1]) * addtionalOption3Count
  }
  return sum
}
