export default function DayPriceManagement({ isDayPriceManagementTab }) {
  return (
    <div id='priceTab3' className={`tabcontent ${isDayPriceManagementTab ? 'current' : ''}`}>
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
      </div>

      <div className='periodWrap mgt_30 mgb_40'>
        <div className='year'>
          <select>
            <option>2022년</option>
            <option>2021년</option>
            <option>2020년</option>
            <option>2019년</option>
          </select>
        </div>
        <div className='month'>
          <button type='button' className='prev'>
            <span className='hdn'>이전일</span>
          </button>
          <a href='#'>01월</a>
          <a href='#' className='selected'>
            02월
          </a>
          <a href='#'>03월</a>
          <a href='#'>04월</a>
          <a href='#'>05월</a>
          <a href='#'>06월</a>
          <a href='#'>07월</a>
          <a href='#'>08월</a>
          <a href='#'>09월</a>
          <a href='#'>10월</a>
          <a href='#'>11월</a>
          <a href='#'>12월</a>
          <button type='button' className='next'>
            <span className='hdn'>다음일</span>
          </button>
        </div>
      </div>

      <section>
        <h4>날짜별 객실 요금</h4>
        <div className='ex-txt v1 mgb_15'>
          <p>
            달력에 요금이 안보이시면, <strong>기간별 요금을 먼저 설정</strong>해 주세요.
          </p>
        </div>
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
            <tr className='date'>
              <th>날짜</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th className='red-txt'>6</th>
              <th className='red-txt'>7</th>
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
            <tr className='date'>
              <th>날짜</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th className='red-txt'>6</th>
              <th className='red-txt'>7</th>
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
            <tr className='date'>
              <th>날짜</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th className='red-txt'>6</th>
              <th className='red-txt'>7</th>
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
      </section>
    </div>
  )
}
