import CalculateSidebar from '../common/Sidebar'

export default function ReservationList() {
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <CalculateSidebar active={0} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2'>
          <div className='titWrap'>
            <h3>예약목록</h3>
          </div>
          <div className='calendarWrap mgb_40 mgt_10'>
            <div className='info'>
              <dl>
                <dt>숙소선택 :</dt>
                <dd>
                  <select>
                    <option>롯데호텔</option>
                  </select>
                </dd>
              </dl>
            </div>
            <dl className='period mgt_10'>
              <dt>거래일자 :</dt>
              <dd>
                <select className='mgr_5'>
                  <option>예약일</option>
                </select>
                <div className='date'>
                  <input type='number' placeholder='기간선택' className='left' />
                </div>
                <div className='mgl_5 mgr_5 date'>
                  <input type='number' placeholder='기간선택' className='left' />
                </div>
                <button className='btn btn-middle purple' type='button'>
                  검색
                </button>
                <button className='btn btn-middle purple2' type='button'>
                  오늘보기
                </button>
              </dd>
            </dl>
            <div
              className='quick-layer sel-date'
              style={{ width: '238px', left: '220px', display: 'none' }}
            >
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
                  <col width='14.2%' />
                  <col width='14.2%' />
                  <col width='14.2%' />
                  <col width='14.2%' />
                  <col width='14.2%' />
                  <col width='14.2%' />
                  <col width='*' />
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
          <div className='searchWrap'>
            <span className='num'>Total 3,768건 1 페이지</span>
            <div className='searchBox'>
              <a href='#' className='btn btn-middle line1'>
                엑셀다운받기
              </a>
              <a href='#' className='btn btn-middle line1'>
                자료출력하기
              </a>
            </div>
          </div>
          <table className='tbl-list'>
            <caption>숙소목록</caption>
            <colgroup>
              <col width='60px' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
              <col width='' />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>예약일</th>
                <th>예약처</th>
                <th>고객명</th>
                <th>고객연락처</th>
                <th>투숙일</th>
                <th>퇴실일</th>
                <th>투숙기간</th>
                <th>거래처명</th>
                <th>숙소명</th>
                <th>객실타입</th>
                <th>객실명</th>
                <th>객실판매요금</th>
                <th>인원추가요금</th>
                <th>옵션추가요금</th>
                <th>객실조정요금</th>
                <th>합계</th>
                <th>결제금액</th>
                <th>잔액</th>
                <th>결제방법</th>
                <th>상태</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr className='total'>
                <td colspan='7'>합계</td>
                <td>2N</td>
                <td colspan='4'></td>
                <td>440,000</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>440,000</td>
                <td>0</td>
                <td>440,000</td>
                <td colspan='4'></td>
              </tr>
              <tr>
                <td>1</td>
                <td>21-11-29</td>
                <td>숙박</td>
                <td>홍길동</td>
                <td>01023232323</td>
                <td>21-11-29</td>
                <td>21-11-29</td>
                <td>2N</td>
                <td>에어비앤비</td>
                <td>롯데호텔</td>
                <td>디럭스룸</td>
                <td>101호</td>
                <td>440,000</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>440,000</td>
                <td>0</td>
                <td>440,000</td>
                <td>카드</td>
                <td>
                  <span className='state s1'>예약</span>
                </td>
                <td>상세보기</td>
              </tr>
              <tr>
                <td>1</td>
                <td>21-11-29</td>
                <td>숙박</td>
                <td>홍길동</td>
                <td>01023232323</td>
                <td>21-11-29</td>
                <td>21-11-29</td>
                <td>2N</td>
                <td>에어비앤비</td>
                <td>롯데호텔</td>
                <td>디럭스룸</td>
                <td>101호</td>
                <td>440,000</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>440,000</td>
                <td>0</td>
                <td>440,000</td>
                <td>카드</td>
                <td>
                  <span className='state s2'>잔금</span>
                </td>
                <td>상세보기</td>
              </tr>
              <tr>
                <td>1</td>
                <td>21-11-29</td>
                <td>숙박</td>
                <td>홍길동</td>
                <td>01023232323</td>
                <td>21-11-29</td>
                <td>21-11-29</td>
                <td>2N</td>
                <td>에어비앤비</td>
                <td>롯데호텔</td>
                <td>디럭스룸</td>
                <td>101호</td>
                <td>440,000</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>440,000</td>
                <td>0</td>
                <td>440,000</td>
                <td>카드</td>
                <td>
                  <span className='state s3'>미입금</span>
                </td>
                <td>상세보기</td>
              </tr>
              <tr>
                <td>1</td>
                <td>21-11-29</td>
                <td>숙박</td>
                <td>홍길동</td>
                <td>01023232323</td>
                <td>21-11-29</td>
                <td>21-11-29</td>
                <td>2N</td>
                <td>에어비앤비</td>
                <td>롯데호텔</td>
                <td>디럭스룸</td>
                <td>101호</td>
                <td>440,000</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>440,000</td>
                <td>0</td>
                <td>440,000</td>
                <td>카드</td>
                <td>
                  <span className='state s4'>예약완료</span>
                </td>
                <td>상세보기</td>
              </tr>
            </tbody>
          </table>
          <div className='paging mgt_20'>
            <a href='#' className='first'>
              <span className='hdn'>맨처음페이지</span>
            </a>
            <a href='#' className='prev'>
              <span className='hdn'>이전페이지</span>
            </a>
            <a href='#' className='on'>
              1
            </a>
            <a href='#'>2</a>
            <a href='#'>3</a>
            <a href='#'>4</a>
            <a href='#'>5</a>
            <a href='#' className='next'>
              <span className='hdn'>다음페이지</span>
            </a>
            <a href='#' className='last'>
              <span className='hdn'>맨마지막페이지</span>
            </a>
          </div>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
