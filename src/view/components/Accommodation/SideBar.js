import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div id='lnb'>
      <h2>숙소관리</h2>
      <a href='#' className='menu close'>
        <span className='hidden'>메뉴열기/닫기</span>
      </a>
      <ul>
        <li>
          <Link className='on' to={'/accommodation'}>
            숙소등록관리
          </Link>
        </li>
        <li>
          <a href='#'>객실타입등록관리</a>
        </li>
        <li>
          <a href='#'>객실등록관리</a>
        </li>
      </ul>
    </div>
  )
}
