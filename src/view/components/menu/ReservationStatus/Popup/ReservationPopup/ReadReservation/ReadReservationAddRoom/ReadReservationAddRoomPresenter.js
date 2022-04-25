import { numberToArray } from '@util/common/lodash'
import { formatMoney } from '@util/common/others'
import { Suspense } from 'react'
import ReservationPopupDateForm from '../../common/ReservationPopupDateForm'
import RoomSelect from '../../common/RoomSelect'
import AddRoomTypeSelect from '../../common/RoomTypeSelect'

export default function ReadReservationAddRoomPresenter({
  register,
  reset,
  watch,
  getValues,
  count,
  roomFee,
  addPersonFee,
  optionWithoutAddPersonFee,
  roomTotalFee,
  handleToggle,
  cancelButton,
  decreaseRoomCount,
  open,
  roomType,
  setRoomType,
  room,
  setRoom,
  startDate,
  endDate,
  basicPersionNum,
  maxPersionNum,
  originPrice,
  adult,
  adultBreakfast,
  child,
  childBreakfast,
  infant,
  infantBreakfast,
  breakfastFeeObjectLength,
  breakfastFeeObject,
  extFeeObject,
  extFeeObjectLength,
  optionFee,
  additionalOption1,
  additionalOption2,
  additionalOption3,
  acNo,
}) {
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
      <h4>예약객실정보</h4>
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
            <th style={{ background: '#F5F6F8' }}>객실타입</th>
            <th style={{ background: '#F5F6F8' }}>객실명</th>
            <th style={{ background: '#F5F6F8' }} colSpan='2'>
              입실일 ~ 퇴실일
            </th>
            <th style={{ background: '#F5F6F8' }}>인원(기본/최대)</th>
            <th style={{ background: '#F5F6F8' }}>객실요금</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Suspense
                fallback={
                  <select>
                    <option>객실타입선택</option>
                  </select>
                }
              >
                <AddRoomTypeSelect
                  roomType={roomType}
                  setRoomType={setRoomType}
                  register={register}
                  count={count}
                  acNo={acNo}
                />
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
                  count={count}
                  watch={watch}
                  acNo={acNo}
                />
              </Suspense>
            </td>
            <td colSpan='2'>
              <ReservationPopupDateForm
                register={register}
                reset={reset}
                getValues={getValues}
                watch={watch}
                top={33}
                count={count}
                defaultCheckInDate={startDate}
                defaultCheckOutDate={endDate}
              />
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
        <h4 className='mgt_30'>예약옵션정보</h4>
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
              <th style={{ background: '#F5F6F8' }}>인원추가</th>
              <th style={{ background: '#F5F6F8' }}>조식추가</th>
              <th style={{ background: '#F5F6F8' }}>옵션추가</th>
              <th style={{ background: '#F5F6F8' }}>옵션합계</th>
              <th style={{ background: '#F5F6F8' }}>요금합계</th>
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
                      <select
                        {...register(`additionalOption1Count${count}`)}
                        defaultValue={additionalOption1}
                      >
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
                      <select
                        {...register(`additionalOption2Count${count}`)}
                        defaultValue={additionalOption2}
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
                      <select
                        {...register(`additionalOption3Count${count}`)}
                        defaultValue={additionalOption3}
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
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
