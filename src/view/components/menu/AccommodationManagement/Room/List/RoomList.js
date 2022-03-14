import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { Link } from 'react-router-dom'

export default function RoomList() {
  return (
    // <!-- S:Container -->
    <div id='container' className='split'>
      {/* <!-- S:lnb --> */}
      <SideBar active={2} />
      {/* <!-- E:lnb --> */}
      {/* <!-- S:content --> */}
      <div className='content2'>
        <div className='titWrap'>
          <h3>객실등록관리</h3>
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

            <Link to={'/accommodationManagement/room/new'} className='btn btn-middle purple'>
              객실추가
            </Link>
          </div>
        </div>
        <table className='tbl-list'>
          <caption>숙소목록</caption>
          <colgroup>
            <col width='80px' />
            <col width='' />
            <col width='' />
            <col width='' />
            <col width='' />
            <col width='' />
            <col width='' />
            <col width='' />
            <col width='' />
            <col width='130px' />
            <col width='' />
          </colgroup>
          <tr>
            <th>
              <span className='only check'>
                <input id='check1' type='checkbox' />
                <label for='check1'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </th>
            <th>번호</th>
            <th>업체명</th>
            <th>숙소명</th>
            <th>객실타입명</th>
            <th>판매시작일</th>
            <th>판매종료일</th>
            <th>등록일</th>
            <th>담당자</th>
            <th>사용</th>
            <th>조회수</th>
          </tr>
          <tr>
            <td>
              <span className='only check'>
                <input id='check2' type='checkbox' />
                <label for='check2'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </td>
            <td>3768</td>
            <td>
              <Link to={'/accommodationManagement/room/1'}>바라크라호텔</Link>
            </td>
            <td>바라크라호텔</td>
            <td>5인실</td>
            <td>21.11.29</td>
            <td>21.11.29</td>
            <td>21.11.29</td>
            <td>최고관리자</td>
            <td>
              <select>
                <option>미사용</option>
                <option>사용</option>
              </select>
            </td>
            <td>1</td>
          </tr>
        </table>
        <div className='btnArea two mgt_20'>
          <div>
            <a href='#' className='btn btn-middle line1'>
              선택삭제
            </a>
            <a href='#' className='btn btn-middle line1'>
              선택복사
            </a>
            <a href='#' className='btn btn-middle line1'>
              선택이동
            </a>
          </div>
          <div>
            <Link to={'/accommodationManagement/room/new'} className='btn btn-middle purple'>
              객실추가
            </Link>
          </div>
        </div>
        <div className='paging'>
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
    // <!-- E:Container -->
  )
}
