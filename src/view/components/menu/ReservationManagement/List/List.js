import Calendar from '@components/common/Calendar/Calendar'

export default function ReservationManagementList() {
  return (
    // <!-- S:Container -->
    <div id='container'>
      {/* <!-- S:content --> */}
      <div className='content3'>
        <div className='titWrap'>
          <h3>예약관리</h3>
        </div>

        <div className='calendarWrap mgb_20'>
          <select>
            <option>기간기준</option>
          </select>
          <div className='mgl_5 date'>
            <span>시작일</span>
            <input type='number' />
          </div>
          <div className='mgl_5 mgr_5 date'>
            <span>종료일</span>
            <input type='number' />
          </div>
          <button className='btn purple btn-middle' type='button'>
            검색
          </button>
          {/* <!-- 날짜선택 --> */}
          <Calendar />
        </div>

        <div className='searchWrap'>
          <span className='num'>Total 3,768건 1 페이지</span>
          <div className='searchBox'>
            <select className='mgr_5'>
              <option>숙소명</option>
            </select>
            <input type='text' placeholder='검색어를 입력하세요' className='mgr_5' />
            <button className='btn-search mgr_5' type='button'>
              <span className='hidden'>검색</span>
            </button>
          </div>
        </div>

        <table className='tbl-list v1'>
          <caption>예약목록</caption>
          <colgroup>
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
          <tbody>
            <tr>
              <th>예약번호</th>
              <th>예약상태</th>
              <th>거래처</th>
              <th>예약자명</th>
              <th>객실타입</th>
              <th>객실명</th>
              <th>체크인</th>
              <th>체크아웃</th>
              <th>결제금액</th>
              <th>예약일</th>
            </tr>
            <tr>
              <td>376448</td>
              <td>
                <span className='state s1'>미입금잔금</span>
              </td>
              <td>바라크라호텔</td>
              <td>홍길동</td>
              <td>15평온돌</td>
              <td>온돌101호</td>
              <td>21.11.29</td>
              <td>21.11.29</td>
              <td>90,000원</td>
              <td>21.11.29</td>
            </tr>
            <tr>
              <td>376448</td>
              <td>
                <span className='state s2'>요청완료</span>
              </td>
              <td>바라크라호텔</td>
              <td>홍길동</td>
              <td>15평온돌</td>
              <td>온돌101호</td>
              <td>21.11.29</td>
              <td>21.11.29</td>
              <td>90,000원</td>
              <td>21.11.29</td>
            </tr>
            <tr>
              <td>376448</td>
              <td>
                <span className='state s3'>입실</span>
              </td>
              <td>바라크라호텔</td>
              <td>홍길동</td>
              <td>15평온돌</td>
              <td>온돌101호</td>
              <td>21.11.29</td>
              <td>21.11.29</td>
              <td>90,000원</td>
              <td>21.11.29</td>
            </tr>
            <tr>
              <td>376448</td>
              <td>
                <span className='state s4'>퇴실</span>
              </td>
              <td>바라크라호텔</td>
              <td>홍길동</td>
              <td>15평온돌</td>
              <td>온돌101호</td>
              <td>21.11.29</td>
              <td>21.11.29</td>
              <td>90,000원</td>
              <td>21.11.29</td>
            </tr>
            <tr>
              <td>376448</td>
              <td>
                <span className='state s5'>미입금퇴실</span>
              </td>
              <td>바라크라호텔</td>
              <td>홍길동</td>
              <td>15평온돌</td>
              <td>온돌101호</td>
              <td>21.11.29</td>
              <td>21.11.29</td>
              <td>90,000원</td>
              <td>21.11.29</td>
            </tr>
            <tr>
              <td>376448</td>
              <td>
                <span className='state s4'>퇴실</span>
              </td>
              <td>바라크라호텔</td>
              <td>홍길동</td>
              <td>15평온돌</td>
              <td>온돌101호</td>
              <td>21.11.29</td>
              <td>21.11.29</td>
              <td>90,000원</td>
              <td>21.11.29</td>
            </tr>
          </tbody>
        </table>
        <div className='paging mgt_40'>
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
    //<!-- E:Container -->
  )
}
