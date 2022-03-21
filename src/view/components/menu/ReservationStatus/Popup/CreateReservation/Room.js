import RoomSelect from '@components/common/RoomSelect'
import RoomTypeSelect from '@components/menu/PriceManagement/common/RoomTypeSelect'
import { currentPeriodPriceManagementRoomTypeAtom } from '@state/priceManagement/periodPriceManagement'
import { createReservationAtom } from '@state/reservationStatus/createReservation'
import { addReserverationRoomCountAtom } from '@state/reservationStatus/reservationStatus'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { formatMoney } from '@util/common/others'
import { addDays } from 'date-fns'
import { Suspense, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function CreateReservationAddRoom({ cancelButton }) {
  const [open, setOpen] = useState(false)
  const setRoomCount = useSetRecoilState(addReserverationRoomCountAtom)
  const createReservation = useRecoilValue(createReservationAtom)
  const startDate = formatyyyyMMddWithHyphen(createReservation.currentDate)
  const endDate = formatyyyyMMddWithHyphen(addDays(createReservation.currentDate, 1))
  const roomType = useRecoilValue(currentPeriodPriceManagementRoomTypeAtom)
  console.log(roomType)
  const { basicPersionNum, maxPersionNum, originPrice } = roomType

  //추가인원으로 등록가능한 총 숫자
  const addPersonLimit = maxPersionNum - basicPersionNum

  const handleToggle = () => setOpen((prev) => !prev)
  const decreaseRoomCount = () => setRoomCount((prev) => prev - 1)
  return (
    <section className='add-group'>
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
                <RoomTypeSelect />
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
                <RoomSelect />
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
                <select defaultValue={basicPersionNum}>
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
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(addPersonLimit).map((number) => (
                      <option value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  <span className='num'>성인</span>
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  <span className='num'>바베큐그릴대여</span>
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td rowSpan='3'>150,000원</td>
              <td rowSpan='3'>150,000원</td>
            </tr>
            <tr>
              <td>
                <div className='dF-s'>
                  <span className='num'>유아</span>
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(addPersonLimit).map((number) => (
                      <option value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  <span className='num'>유아</span>
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td rowSpan='2'></td>
            </tr>
            <tr>
              <td>
                <div className='dF-s'>
                  <span className='num'>소아</span>
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(addPersonLimit).map((number) => (
                      <option value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td>
                <div className='dF-s'>
                  <span className='num'>소아</span>
                  <select>
                    <option value={0}>0명</option>
                    {numberToArray(maxPersionNum).map((number) => (
                      <option key={number} value={number}>{`${number}명`}</option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
