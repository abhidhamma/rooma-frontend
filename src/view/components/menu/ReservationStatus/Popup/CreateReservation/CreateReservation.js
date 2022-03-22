import useApiCallback from '@hook/apiHook/useApiCallback'
import { isDisplayCreateReservationAtom } from '@state/reservation'
import {
  createReservationAtom,
  createReservationSelector,
} from '@state/reservationStatus/createReservation'
import { addReserverationRoomCountAtom } from '@state/reservationStatus/reservationStatus'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { formatMoney } from '@util/common/others'
import { addDays } from 'date-fns'
import _ from 'lodash/fp'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CreateReservationAddRoom from './Room'

export default function CreateReservation() {
  const [roomPrices, setRoomPrices] = useState({})
  const [addPersonPrices, setAddPersonPrices] = useState(0)
  const [optionPrices, setOptionPrices] = useState(0)
  const [totalPrices, setTotalPrices] = useState(0)
  const [rmNoObject, setRmNoObject] = useState([])
  const [isReservationButtonOpen, setIsReservationButtonOpen] = useState(false)
  const [isCheckInButtonOpen, setIsCheckInButtonOpen] = useState(false)
  const [roomCount, setRoomCount] = useRecoilState(addReserverationRoomCountAtom)
  const setIsDisplayCreateReservation = useSetRecoilState(isDisplayCreateReservationAtom)
  const popUpParameter = useRecoilValue(createReservationAtom)
  const createReservationCallback = useApiCallback('createReservation')
  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const { register, handleSubmit, watch, reset } = useForm({ defaultValues })

  const { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice } = calculatePrices(
    roomCount,
    roomPrices,
    addPersonPrices,
    optionPrices,
    totalPrices
  )
  const checkinDate = formatyyyyMMddWithHyphen(popUpParameter.currentDate)
  const checkoutDate = formatyyyyMMddWithHyphen(addDays(popUpParameter.currentDate, 1))

  const onSubmit = _.flow(
    preprocessSubmitData(checkinDate, checkoutDate, roomCount, rmNoObject, totalPrices),
    createReservation(createReservationCallback),
    initializeCreateReservationForm(
      setIsDisplayCreateReservation,
      setRoomCount,
      setIsReservationButtonOpen,
      setIsCheckInButtonOpen
    )
  )

  return (
    // <!-- S:예약정보 layer -->
    <div
      id='reservPOP'
      className='popup-box'
      style={{
        display: 'block',
        position: 'fixed !important',
        left: '50%',
        top: '50%',
        zIndex: '10007',
        maxWidth: '1000px',
        outline: '0',
        overflow: 'hidden',
        marginTop: '-448px',
        marginLeft: '-500px',
      }}
    >
      <div className='popWrap'>
        <a
          href='#'
          className='pop-close layer-close'
          style={{
            width: '18px',
            height: '18px',
            display: 'inline-block',
            position: 'absolute',
          }}
          onClick={() => setIsDisplayCreateReservation(false)}
        >
          닫기
        </a>
        <div className='pop-tit'>예약정보</div>
        <form id='createReservation' onSubmit={handleSubmit(onSubmit)}>
          <input type={'hidden'} {...register('rrNo')} />
          <input type={'hidden'} {...register('payStatus')} />
          <input type={'hidden'} {...register('reserveStatus')} />
          <input type={'hidden'} {...register('reserveNum')} />
          <div className='pop-cont'>
            {/* <!-- S:레이어 컨텐츠 --> */}
            <div className='reserv-input'>
              <section className='resev-num'>
                <dl>
                  <dt>예약번호</dt>
                  <dd>123456712131</dd>
                </dl>
                <div className='r-right'>
                  <div className='reserv-state'>
                    <a
                      href='#'
                      className={isReservationButtonOpen ? 'c1 drop down' : 'c1 drop'}
                      onClick={() => setIsReservationButtonOpen(!isReservationButtonOpen)}
                    >
                      예약완료
                    </a>
                    <ul
                      className='category-menu c1'
                      style={{ display: isReservationButtonOpen ? 'block' : 'none' }}
                    >
                      <li>
                        <a href='#'>입금완료</a>
                      </li>
                      <li>
                        <a href='#'>입금완료</a>
                      </li>
                    </ul>
                  </div>
                  <div className='reserv-state'>
                    <a
                      href='#'
                      className={isCheckInButtonOpen ? 'c2 drop down' : 'c2 drop'}
                      onClick={() => setIsCheckInButtonOpen(!isCheckInButtonOpen)}
                    >
                      입실전
                    </a>
                    <ul
                      className='category-menu c2'
                      style={{ display: isCheckInButtonOpen ? 'block' : 'none' }}
                    >
                      <li>
                        <a href='#'>입실전</a>
                      </li>
                      <li>
                        <a href='#'>입실전</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <h3>예약상세정보</h3>
                <table className='tbl-view-pop'>
                  <caption>예약상세정보</caption>
                  <colgroup>
                    <col width='11%' />
                    <col width='22%' />
                    <col width='11%' />
                    <col width='22%' />
                    <col width='11%' />
                    <col width='23%' />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>실사용자명</th>
                      <td>
                        <input
                          type='text'
                          placeholder='실사용자명 입력해주세요'
                          {...register('userName')}
                        />
                      </td>
                      <th>연락번호</th>
                      <td>
                        <input
                          type='text'
                          placeholder='연락번호 입력해주세요'
                          {...register('userPhone')}
                        />
                      </td>
                      <th>환불계좌</th>
                      <td>
                        <input type='text' />
                      </td>
                    </tr>
                    <tr>
                      <th>거래처명</th>
                      <td>
                        <input type='text' {...register('agentName')} />
                      </td>
                      <th>거래처연락처</th>
                      <td>
                        <input type='text' {...register('agentPhone')} />
                      </td>
                      <th>거래처팩스</th>
                      <td>
                        <input type='text' />
                      </td>
                    </tr>
                    <tr>
                      <th>담당자</th>
                      <td>
                        <input type='text' {...register('agentCharger')} />
                      </td>
                      <th>담당자연락처</th>
                      <td colSpan='3'>
                        <input type='text' {...register('agentChargerPhone')} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <div className='right mgb_10'>
                <a href='#' className='add-gr' onClick={increaseRoom}>
                  + 객실추가
                </a>
              </div>
              {numberToArray(roomCount).map((number) =>
                number === 1 ? (
                  <CreateReservationAddRoom
                    key={number}
                    cancelButton={true}
                    register={register}
                    watch={watch}
                    reset={reset}
                    count={number}
                    setRoomPrices={setRoomPrices}
                    setAddPersonPrices={setAddPersonPrices}
                    setOptionPrices={setOptionPrices}
                    setTotalPrices={setTotalPrices}
                    setRmNoObject={setRmNoObject}
                  />
                ) : (
                  <CreateReservationAddRoom
                    key={number}
                    cancelButton={false}
                    register={register}
                    watch={watch}
                    reset={reset}
                    count={number}
                    setRoomPrices={setRoomPrices}
                    setAddPersonPrices={setAddPersonPrices}
                    setOptionPrices={setOptionPrices}
                    setTotalPrices={setTotalPrices}
                    setRmNoObject={setRmNoObject}
                  />
                )
              )}

              <section>
                <h3>예약메모정보</h3>
                <table className='tbl-view-pop'>
                  <caption>예약메모정보</caption>
                  <colgroup>
                    <col width='15%' />
                    <col width='35%' />
                    <col width='15%' />
                    <col width='35%' />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>메모</th>
                      <td>
                        <input
                          type='text'
                          placeholder='메모를 입력해주세요'
                          {...register('memo')}
                        />
                      </td>
                      <th>거래처메모</th>
                      <td>
                        <input
                          type='text'
                          placeholder='거래처메모를 입력해주세요'
                          {...register('agentMemo')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>현장결제메모</th>
                      <td colSpan='3'>
                        <textarea
                          placeholder='현장결제메모를 입력해주세요'
                          style={{ height: '60px' }}
                          {...register('fieldMemo')}
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section>
                <table className='tbl-pop'>
                  <caption>예약객실정보</caption>
                  <colgroup>
                    <col width='14%' />
                    <col width='14%' />
                    <col width='14%' />
                    <col width='14%' />
                    <col width='14%' />
                    <col width='14%' />
                    <col width='*' />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        ( 총 객실요금<span>-</span>
                      </th>
                      <th>
                        객실 조정요금 )<span>+</span>
                      </th>
                      <th>
                        ( 총 인원추가요금<span>-</span>
                      </th>
                      <th>
                        인원 조정요금 )<span>+</span>
                      </th>
                      <th>
                        ( 총 옵션요금<span>-</span>
                      </th>
                      <th>
                        옵션조정요금 )<span>=</span>
                      </th>
                      <th>총요금</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{`${formatMoney(totalRoomPrice)}원`}</td>
                      <td>
                        <div className='dF-s'>
                          <input type='text' placeholder='요금입력' {...register('adjSalePrice')} />
                          <span className='num'>원</span>
                        </div>
                      </td>
                      <td>{`${formatMoney(totalAddPersonPrice)}원`}</td>
                      <td>
                        <div className='dF-s'>
                          <input
                            type='text'
                            placeholder='요금입력'
                            {...register('adjAddPersionPrice')}
                          />
                          <span className='num'>원</span>
                        </div>
                      </td>
                      <td>{`${formatMoney(totalOptionPrice)}원`}</td>
                      <td>
                        <div className='dF-s'>
                          <input
                            type='text'
                            placeholder='요금입력'
                            {...register('adjOptionPrice')}
                          />
                          <span className='num'>원</span>
                        </div>
                      </td>
                      <td className='total'>{`${formatMoney(totalPrice)}원`}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
            {/* <!-- E:레이어 컨텐츠 --> */}
            <div className='pop-footer'>
              <button
                type='submit'
                style={{
                  display: 'block',
                  background: '#5b73e8',
                  textAlign: 'center',
                  height: '60px',
                  lineHeight: '60px',
                  color: '#fff',
                  fontSize: '20px',
                  width: '100%',
                }}
              >
                예약하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    //<!-- E:예약정보 layer -->
  )
}
const defaultValues = {
  rrNo: 0,
  rmNo: 5,
  reserveStatus: 'RESERVECOMPLETE',
  payStatus: 'NOTPAY',
  payAmount: 50000,
  reserveNum: '',
  userName: '변경익',
  userPhone: '010-1111-4444',
  agentName: '회사',
  agentPhone: '010-1111-2222',
  agentCharger: '시스템담당자',
  agentChargerPhone: '010-3333-4444',
  adjSalePrice: 10000,
  adjAddPersionPrice: 0,
  adjOptionPrice: 0,
  memo: '',
  agentMemo: '',
  fieldMemo: '',
}
const calculatePrices = (roomCount, roomPrices, addPersonPrices, optionPrices, totalPrices) => {
  let totalRoomPrice = 0
  let totalAddPersonPrice = 0
  let totalOptionPrice = 0
  let totalPrice = 0

  const eachTotalPrice = _.each((number) => {
    totalRoomPrice += roomPrices[`roomFee${number}`]
    totalAddPersonPrice += addPersonPrices[`addPersonFee${number}`]
    totalOptionPrice += optionPrices[`optionFee${number}`]
    totalPrice += totalPrices[`roomTotalFee${number}`]
  })
  _.flow(numberToArray, eachTotalPrice)(roomCount)
  return { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice }
}
const preprocessSubmitData =
  (checkinDate, checkoutDate, roomCount, rmNoObject, totalPrices) => (submitData) => {
    const rmNo = rmNoObject['1']
    const payAmount = totalPrices[`roomTotalFee1`]
    const {
      rrNo,
      reserveStatus,
      payStatus,
      reserveNum,
      userName,
      userPhone,
      agentName,
      agentPhone,
      agentCharger,
      agentChargerPhone,
      adjSalePrice,
      adjAddPersionPrice,
      adjOptionPrice,
      memo,
      agentMemo,
      fieldMemo,
    } = submitData
    const roomReserves = makeRoomReserves(
      submitData,
      checkinDate,
      checkoutDate,
      roomCount,
      rmNoObject,
      totalPrices
    )
    return {
      rrNo,
      rmNo,
      reserveStatus,
      payStatus,
      payAmount,
      reserveNum,
      userName,
      userPhone,
      agentName,
      agentPhone,
      agentCharger,
      agentChargerPhone,
      adjSalePrice,
      adjAddPersionPrice,
      adjOptionPrice,
      memo,
      agentMemo,
      fieldMemo,
      roomReserves,
    }
  }
const makeRoomReserves = (
  submitData,
  checkinDate,
  checkoutDate,
  roomCount,
  rmNoObject,
  totalPrices
) => {
  const mapRoomReservation = _.map((number) => {
    const stayNum = submitData[`stayNum${number}`]
    const salePrice = totalPrices[`roomTotalFee${number}`]
    const addPerionCon = `성인:${submitData[`adultCount${number}`]},소아:${
      submitData[`childCount${number}`]
    },유아:${submitData[`childCount${number}`]}`
    const addBreakfastCon = `성인:${submitData[`adultBreakfastCount${number}`]},소아:${
      submitData[`childBreakfastCount${number}`]
    },유아:${submitData[`infantBreakfastCount${number}`]}`
    return {
      rrNo: 0,
      rmNo: rmNoObject[`${number}`],
      checkinDate,
      checkoutDate,
      stayNum,
      salePrice,
      addPerionCon,
      addBreakfastCon,
      addOptionCon: '바베큐',
    }
  })

  return _.flow(numberToArray, mapRoomReservation)(roomCount)
}
const createReservation = (createReservationCallback) => async (jsonData) => {
  const isSuccess = await createReservationCallback(createReservationSelector(jsonData)).then(
    (result) => {
      console.log(result)
      const { message } = result
      if (message === '업데이트 성공') {
        alert('예약이 완료되었습니다.')
        return true
      } else {
        alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
        return false
      }
    }
  )
  return isSuccess
}
const initializeCreateReservationForm =
  (
    setIsDisplayCreateReservation,
    setRoomCount,
    setIsReservationButtonOpen,
    setIsCheckInButtonOpen
  ) =>
  (promise) => {
    promise.then((isSuccess) => {
      if (isSuccess) {
        setIsDisplayCreateReservation(false)
        setRoomCount(1)
        setIsReservationButtonOpen(false)
        setIsCheckInButtonOpen(false)
      }
    })
  }
