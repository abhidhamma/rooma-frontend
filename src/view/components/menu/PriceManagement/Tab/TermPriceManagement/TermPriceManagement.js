import Calendar from '@components/common/Calendar'

export default function TermPriceManagement({ isTermPriceManagementTab }) {
  return (
    <div id='priceTab2' className={`tabcontent ${isTermPriceManagementTab ? 'current' : ''}`}>
      <div className='calendarWrap mgb_40 mgt_30'>
        <div className='info'>
          <dl>
            <dt>숙소명 : </dt>
            <dd>롯데호텔</dd>
          </dl>
          <dl>
            <dt>객실타입 : </dt>
            <dd>
              <select>
                <option>객실타입선택</option>
              </select>
            </dd>
          </dl>
        </div>
        <dl className='period mgt_10'>
          <dt>적용기간 :</dt>
          <dd>
            <div className='mgl_5 date'>
              <span>변경시작일</span>
              <input type='number' />
            </div>
            <div className='mgl_5 mgr_5 date'>
              <span>변경마지막일</span>
              <input type='number' />
            </div>
          </dd>
        </dl>
        <Calendar />
      </div>
      <section>
        <h4>객실기본요금</h4>
        <table>
          <caption>요일별 요금</caption>
          <colgroup>
            <col width='33.3%' />
            <col width='33.3%' />
            <col width='33.4%' />
          </colgroup>
          <tbody>
            <tr>
              <th>정상가</th>
              <th>할인가</th>
              <th>입금가</th>
            </tr>
            <tr>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='right mgt_20'>
          <button type='button' className='btn purple btn-middle'>
            요일별 요금설정
          </button>
        </div>
      </section>
      <section>
        <h4>요일별 객실 요금</h4>
        <table>
          <caption>요일별 요금</caption>
          <colgroup>
            <col width='*' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
          </colgroup>
          <tbody>
            <tr>
              <th>구분</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th className='red-txt'>토</th>
              <th className='red-txt'>일</th>
            </tr>
            <tr>
              <td className='bg'>정상</td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='bg'>할인</td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='bg'>입금</td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' />
                  <span>원</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='right mgt_20'>
          <button type='button' className='btn purple btn-middle'>
            기간내 객실요금 변경
          </button>
        </div>
      </section>
    </div>
  )
}
