import { useState } from 'react'

export default function PriceManagementList() {
  const [currentTabFlag, setCurrentTabFlag] = useState(true)

  const changeTab = () => {
    setCurrentTabFlag((prev) => !prev)
  }
  const isMakePriceTab = currentTabFlag === true
  const isConfigPriceTab = currentTabFlag === false
  return (
    // <!-- S:Container -->
    <div id='container'>
      {/* <!-- S:content --> */}
      <div className='full-content'>
        <div className='titWrap'>
          <h3>요금관리</h3>
        </div>
        <div className='price-input'>
          <ul className='tabs'>
            <li
              className={isMakePriceTab ? 'current' : ''}
              data-tab='priceTab1'
              onClick={changeTab}
            >
              <a href='#'>요금만들기(임시)</a>
            </li>
            <li
              className={isConfigPriceTab ? 'current' : ''}
              data-tab='priceTab2'
              onClick={changeTab}
            >
              <a href='#'>요금설정(임시)</a>
            </li>
          </ul>

          <div id='priceTab1' className={`tabcontent ${isMakePriceTab ? 'current' : ''}`}>
            <div className='ex-txt'>
              <p>상시 판매되는 요금으로 판매중인 모든 객실에 대해 필수로 설정되어야 합니다.</p>
              <p>
                가격입력 후 <strong>요금만들기 버튼을 클릭</strong>하시면 기간별 요금 설정 페이지로
                이동됩니다.
              </p>
            </div>
            <table>
              <caption>요일별 요금입력</caption>
              <colgroup>
                <col width='*' />
                <col width='11%' />
                <col width='11%' />
                <col width='11%' />
                <col width='11%' />
                <col width='11%' />
                <col width='11%' />
                <col width='11%' />
              </colgroup>
              <tbody>
                <tr>
                  <th rowSpan='2'>객실타입</th>
                  <th rowSpan='2'>정상가</th>
                  <th rowSpan='2'>할인가(판매가)</th>
                  <th rowSpan='2'>입금가(공급가)</th>
                  <th colSpan='3'>추가요금</th>
                  <th rowSpan='2'>비고</th>
                </tr>
                <tr>
                  <th className='bg'>성인</th>
                  <th className='bg'>소아</th>
                  <th className='bg'>유아</th>
                </tr>
                <tr>
                  <td className='bg'>디럭스룸</td>
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
                  <td className='center'>
                    <a href='#' className='make'>
                      요금만들기
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className='bg'>디럭스룸</td>
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
                  <td className='center'>
                    <a href='#' className='make'>
                      요금만들기
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className='bg'>디럭스룸</td>
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
                  <td className='center'>
                    <a href='#' className='make'>
                      요금만들기
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div id='priceTab2' className={`tabcontent ${isConfigPriceTab ? 'current' : ''}`}>
            <div className='periodWrap mgt_30'>
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

            <div className='calendarWrap mgb_40 mgt_20'>
              <select>
                <option>객실타입선택</option>
              </select>
              <div className='mgl_5 date'>
                <span>변경시작일</span>
                <input type='number' />
              </div>
              <div className='mgl_5 mgr_5 date'>
                <span>변경마지막일</span>
                <input type='number' />
              </div>
              <button className='btn purple btn-middle' type='button'>
                검색
              </button>
              {/* <!-- 날짜선택 --> */}
              <div className='quick-layer sel-date' style={{ width: '240px', left: '725px' }}>
                <div className='tit'>
                  <a href='#' className='month-prev'>
                    <span className='hdn'>이전달</span>
                  </a>
                  <div className='month'>2021년3월</div>
                  <a href='#' className='month-next'>
                    <span className='hdn'>다음달</span>
                  </a>
                </div>
                <div className='dateArea'>
                  <table>
                    <caption>datepicker</caption>
                    <colgroup>
                      <col width='14.2%' />
                      <col width='14.2%' />
                      <col width='14.2%' />
                      <col width='14.2%' />
                      <col width='14.2%' />
                      <col width='14.2%' />
                      <col width='*' />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className='sun'>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th className='sat'>토</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className='day sun'>1</div>
                        </td>
                        <td>
                          <div className='day'>2</div>
                        </td>
                        <td>
                          <div className='day'>3</div>
                        </td>
                        <td>
                          <div className='day'>4</div>
                        </td>
                        <td>
                          <div className='day'>5</div>
                        </td>
                        <td>
                          <div className='day'>6</div>
                        </td>
                        <td>
                          <div className='day sat'>7</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='day sun'>8</div>
                        </td>
                        <td>
                          <div className='day'>9</div>
                        </td>
                        <td>
                          <div className='day'>10</div>
                        </td>
                        <td>
                          <div className='day today'>11</div>
                        </td>
                        <td>
                          <div className='day'>12</div>
                        </td>
                        <td>
                          <div className='day'>13</div>
                        </td>
                        <td>
                          <div className='day sat'>14</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='day sun'>15</div>
                        </td>
                        <td>
                          <div className='day'>16</div>
                        </td>
                        <td>
                          <div className='day'>17</div>
                        </td>
                        <td>
                          <div className='day'>18</div>
                        </td>
                        <td>
                          <div className='day'>19</div>
                        </td>
                        <td>
                          <div className='day'>20</div>
                        </td>
                        <td>
                          <div className='day sat'>21</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='day sun'>22</div>
                        </td>
                        <td>
                          <div className='day'>23</div>
                        </td>
                        <td>
                          <div className='day'>24</div>
                        </td>
                        <td>
                          <div className='day'>25</div>
                        </td>
                        <td>
                          <div className='day'>26</div>
                        </td>
                        <td>
                          <div className='day'>27</div>
                        </td>
                        <td>
                          <div className='day sat'>28</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='day sun'>29</div>
                        </td>
                        <td>
                          <div className='day next'>30</div>
                        </td>
                        <td>
                          <div className='day next'>31</div>
                        </td>
                        <td>
                          <div className='day next'>1</div>
                        </td>
                        <td>
                          <div className='day next'>2</div>
                        </td>
                        <td>
                          <div className='day next'>3</div>
                        </td>
                        <td>
                          <div className='day next'>4</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <section>
              <h4>요일별 요금</h4>
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
                  날짜별 요금 만들기
                </button>
              </div>
            </section>
            <section>
              <h4>기간별 요금</h4>
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
        </div>
      </div>
      {/* <!-- E:content --> */}
    </div>
    // <!-- E:Container -->
  )
}
