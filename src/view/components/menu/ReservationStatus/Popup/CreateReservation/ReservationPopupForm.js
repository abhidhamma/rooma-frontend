import { numberToArray } from '@util/common/lodash'
import { formatMoney } from '@util/common/others'
import { useState } from 'react'
import CreateReservationAddRoom from './CreateReservationAddRoom'
import ReadReservationAddRoom from './ReadReservationAddRoom'

export default function ReservationPopupForm({
  register,
  handleSubmit,
  onSubmit,
  watch,
  reset,
  increaseRoom,
  roomCount,
  setRoomPrices,
  setAddPersonPrices,
  setOptionPrices,
  setTotalPrices,
  setRmNoObject,
  totalRoomPrice,
  totalAddPersonPrice,
  totalOptionPrice,
  totalPrice,
  close,
  reservation,
  type,
}) {
  const [isReservationButtonOpen, setIsReservationButtonOpen] = useState(false)
  const [isCheckInButtonOpen, setIsCheckInButtonOpen] = useState(false)

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
          onClick={() => close()}
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
                  {reservation?.reserveNum !== undefined ? (
                    <>
                      <dt>예약번호</dt>
                      <dd>{reservation?.reserveNum}</dd>
                    </>
                  ) : (
                    <>
                      <dt>예약번호</dt>
                      <dd></dd>
                    </>
                  )}
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
              {type === 'read'
                ? numberToArray(roomCount).map((number) =>
                    number === 1 ? (
                      <ReadReservationAddRoom
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
                        roomReservation={reservation.roomReserves[number - 1]}
                      />
                    ) : (
                      <ReadReservationAddRoom
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
                        roomReservation={reservation.roomReserves[number - 1]}
                      />
                    )
                  )
                : numberToArray(roomCount).map((number) =>
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
                      <td className='total'>{`${
                        totalPrice === 0
                          ? formatMoney(reservation.payAmount)
                          : formatMoney(totalPrice)
                      }원`}</td>
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
