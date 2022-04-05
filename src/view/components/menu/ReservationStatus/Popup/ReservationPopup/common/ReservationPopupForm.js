import { readReservationParameterAtom } from '@state/reservationStatus/reservationStatus'
import { numberToArray } from '@util/common/lodash'
import { formatMoney } from '@util/common/others'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import CreateReservationAddRoom from '../CreateReservation/CreateReservationAddRoom'
import ReadReservationAddRoom from '../ReadReservation/ReadReservationAddRoom'
import PayStatusSelect from './PayStatusSelect'
import ReservationStateSelect from './ReservationStatus'

export default function ReservationPopupForm({
  register,
  handleSubmit,
  onSubmit,
  watch,
  reset,
  getValues,
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
  const [isShowCont1, setIsShowCont1] = useState(true)
  const [isShowCont2, setIsShowCont2] = useState(false)
  const [isShowCont3, setIsShowCont3] = useState(false)
  const [isShowCont4, setIsShowCont4] = useState(true)
  const readReservationParameter = useRecoilValue(readReservationParameterAtom)
  const getCurrentRoomReservation = (reservation) => {
    const reservationList = reservation.roomReserves
    const currentReservation = reservationList.find(
      (reservation) => reservation.rmNo === readReservationParameter.rmNo
    )
    return currentReservation
  }
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
                  <ReservationStateSelect
                    reservationStatus={watch('reserveStatus')}
                    reset={reset}
                    getValues={getValues}
                  />
                  <PayStatusSelect
                    payStatus={watch('payStatus')}
                    reset={reset}
                    getValues={getValues}
                  />
                </div>
              </section>
              <section className='Enroll cont1'>
                <h3>예약상세정보</h3>
                <a
                  href='#'
                  className={isShowCont1 ? 'openCont on' : 'openCont'}
                  onClick={() => setIsShowCont1((prev) => !prev)}
                >
                  <span className='hdn'>메뉴닫기/열기</span>
                </a>
                <div className='boxCont' style={{ display: isShowCont1 ? 'block' : 'none' }}>
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
                </div>
              </section>
              <section className='Enroll cont2'>
                <h3>예약객실 상세정보</h3>
                <a
                  href='#'
                  className={isShowCont2 ? 'openCont on' : 'openCont'}
                  onClick={() => setIsShowCont2((prev) => !prev)}
                >
                  <span className='hdn'>메뉴닫기/열기</span>
                </a>
                <div className='boxCont' style={{ display: isShowCont2 ? 'block' : 'none' }}>
                  {type !== 'read' && (
                    <div className='right mgb_10'>
                      <a href='#' className='add-gr' onClick={increaseRoom}>
                        + 객실추가
                      </a>
                    </div>
                  )}
                  {type === 'read'
                    ? numberToArray(roomCount).map((number) =>
                        number === 1 ? (
                          <ReadReservationAddRoom
                            key={number}
                            cancelButton={true}
                            register={register}
                            watch={watch}
                            reset={reset}
                            getValues={getValues}
                            count={number}
                            setRoomPrices={setRoomPrices}
                            setAddPersonPrices={setAddPersonPrices}
                            setOptionPrices={setOptionPrices}
                            setTotalPrices={setTotalPrices}
                            setRmNoObject={setRmNoObject}
                            // roomReservation={reservation.roomReserves[number - 1]}
                            roomReservation={getCurrentRoomReservation(reservation)}
                          />
                        ) : (
                          <ReadReservationAddRoom
                            key={number}
                            cancelButton={false}
                            register={register}
                            watch={watch}
                            reset={reset}
                            getValues={getValues}
                            count={number}
                            setRoomPrices={setRoomPrices}
                            setAddPersonPrices={setAddPersonPrices}
                            setOptionPrices={setOptionPrices}
                            setTotalPrices={setTotalPrices}
                            setRmNoObject={setRmNoObject}
                            // roomReservation={reservation.roomReserves[number - 1]}
                            roomReservation={getCurrentRoomReservation(reservation)}
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
                            getValues={getValues}
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
                            getValues={getValues}
                            count={number}
                            setRoomPrices={setRoomPrices}
                            setAddPersonPrices={setAddPersonPrices}
                            setOptionPrices={setOptionPrices}
                            setTotalPrices={setTotalPrices}
                            setRmNoObject={setRmNoObject}
                          />
                        )
                      )}
                </div>
              </section>

              <section className='Enroll cont3'>
                <h3>예약메모정보</h3>
                <a
                  href='#'
                  className={isShowCont3 ? 'openCont on' : 'openCont'}
                  onClick={() => setIsShowCont3((prev) => !prev)}
                >
                  <span className='hdn'>메뉴닫기/열기</span>
                </a>
                <div className='boxCont' style={{ display: isShowCont3 ? 'block' : 'none' }}>
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
                </div>
              </section>
              <section className='Enroll cont4'>
                <h3>결제정보</h3>
                <a
                  href='#'
                  className={isShowCont4 ? 'openCont on' : 'openCont'}
                  onClick={() => setIsShowCont4((prev) => !prev)}
                >
                  <span className='hdn'>메뉴닫기/열기</span>
                </a>
                <div className='boxCont' style={{ display: isShowCont4 ? 'block' : 'none' }}>
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
                            <input
                              type='text'
                              placeholder='요금입력'
                              {...register('adjSalePrice')}
                            />
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
                  <table className='tbl-pop mgt_20'>
                    <caption>결제정보</caption>
                    <colgroup>
                      <col width='20%' />
                      <col width='20%' />
                      <col width='20%' />
                      <col width='20%' />
                      <col width='*' />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>결제구분</th>
                        <th>결제금액</th>
                        <th>결제일</th>
                        <th>결제방법</th>
                        <th>비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select>
                            <option>1차결제</option>
                          </select>
                        </td>
                        <td>
                          <div className='dF-s'>
                            <input type='text' placeholder='요금입력' />
                            <span className='num'>원</span>
                          </div>
                        </td>
                        <td>
                          <input type='text' defaultValue='2022.03.28' className='center' />
                        </td>
                        <td>
                          <select>
                            <option>카드</option>
                          </select>
                        </td>
                        <td className='add-del'>
                          <a href='#'>추가</a>
                          <a href='#'>삭제</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
