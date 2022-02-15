import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { isDisplayCreateReservationAtom } from '../../data/state'

export default function CreateReservation() {
  const [isReservationButtonOpen, setIsReservationButtonOpen] = useState(false)
  const [isCheckInButtonOpen, setIsCheckInButtonOpen] = useState(false)
  const [isDisplayCreateReservation, setIsDisplayCreateReservation] = useRecoilState(isDisplayCreateReservationAtom)
  return (
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
      }}>
      <div className='popWrap'>
        <a
          href='/#'
          className='pop-close layer-close'
          style={{
            width: '18px',
            height: '18px',
            display: 'inline-block',
            position: 'absolute',
          }}
          onClick={() => setIsDisplayCreateReservation(false)}>
          닫기
        </a>
        <div className='pop-tit'>예약정보</div>
        <div className='pop-cont'>
          <div className='reserv-input'>
            <section>
              <div className='r-left'>
                <h3>예약상세정보</h3>
                <table className='tbl-view-pop'>
                  <caption>예약상세정보</caption>
                  <colgroup>
                    <col width='15%' />
                    <col width='35%' />
                    <col width='15%' />
                    <col width='35%' />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>실사용자명</th>
                      <td>
                        <input type='text' placeholder='실사용자명 입력해주세요' />
                      </td>
                      <th>연락번호</th>
                      <td>
                        <input type='text' placeholder='연락번호 입력해주세요' />
                      </td>
                    </tr>
                    <tr>
                      <th>환불계좌</th>
                      <td>
                        <input type='text' />
                      </td>
                      <th>거래처명</th>
                      <td>
                        <input type='text' />
                      </td>
                    </tr>
                    <tr>
                      <th>거래처연락처</th>
                      <td>
                        <input type='text' />
                      </td>
                      <th>거래처팩스</th>
                      <td>
                        <input type='text' />
                      </td>
                    </tr>
                    <tr>
                      <th>담당자</th>
                      <td>
                        <input type='text' />
                      </td>
                      <th>담당자연락처</th>
                      <td>
                        <input type='text' />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='r-right'>
                <div className='reserv-state'>
                  <a href='/#' className={isReservationButtonOpen ? 'c1 drop' : 'c1 drop down'} onClick={() => setIsReservationButtonOpen(!isReservationButtonOpen)}>
                    예약완료
                  </a>
                  <ul className='category-menu c1' style={{ display: isReservationButtonOpen ? 'block' : 'none' }}>
                    <li>
                      <a href='/#'>입금완료</a>
                    </li>
                    <li>
                      <a href='/#'>입금완료</a>
                    </li>
                  </ul>
                </div>
                <div className='reserv-state mgt_20'>
                  <a href='/#' className={isCheckInButtonOpen ? 'c2 drop' : 'c2 drop down'} onClick={() => setIsCheckInButtonOpen(!isCheckInButtonOpen)}>
                    입실전
                  </a>
                  <ul className='category-menu c2' style={{ display: isCheckInButtonOpen ? 'block' : 'none' }}>
                    <li>
                      <a href='/#'>입실전</a>
                    </li>
                    <li>
                      <a href='/#'>입실전</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section>
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
                      <select>
                        <option>15평 온돌방</option>
                      </select>
                    </td>
                    <td>
                      <select>
                        <option>온돌 104호</option>
                      </select>
                    </td>
                    <td colSpan='2'>
                      <div className='term'>
                        <span>2022-01-25</span>
                        <span className='day'>1박</span>
                        <span>2022-01-25</span>
                      </div>
                    </td>
                    <td>
                      <div className='dF-s'>
                        <select>
                          <option>2명</option>
                        </select>
                        <span className='num'>(4/8)</span>
                      </div>
                    </td>
                    <td>150,000원</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <h3>예약옵션정보</h3>
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
                          <option>2명</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className='dF-s'>
                        <span className='num'>성인</span>
                        <select>
                          <option>2명</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className='dF-s'>
                        <span className='num'>바베큐그릴대여</span>
                        <select>
                          <option>2명</option>
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
                          <option>2명</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className='dF-s'>
                        <span className='num'>유아</span>
                        <select>
                          <option>2명</option>
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
                          <option>2명</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className='dF-s'>
                        <span className='num'>소아</span>
                        <select>
                          <option>2명</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
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
                      <input type='text' placeholder='메모를 입력해주세요' />
                    </td>
                    <th>거래처메모</th>
                    <td>
                      <input type='text' placeholder='거래처메모를 입력해주세요' />
                    </td>
                  </tr>
                  <tr>
                    <th>현장결제메모</th>
                    <td colSpan='3'>
                      <textarea placeholder='현장결제메모를 입력해주세요' style={{ height: '60px' }}></textarea>
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
                    <td>150,000원</td>
                    <td>
                      <div className='dF-s'>
                        <input type='text' placeholder='요금입력' />
                        <span className='num'>원</span>
                      </div>
                    </td>
                    <td>150,000원</td>
                    <td>
                      <div className='dF-s'>
                        <input type='text' placeholder='요금입력' />
                        <span className='num'>원</span>
                      </div>
                    </td>
                    <td>150,000원</td>
                    <td>
                      <div className='dF-s'>
                        <input type='text' placeholder='요금입력' />
                        <span className='num'>원</span>
                      </div>
                    </td>
                    <td className='total'>150,000원</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          <div className='pop-footer'>
            <a href='/#' className='btn-reserv'>
              예약하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
