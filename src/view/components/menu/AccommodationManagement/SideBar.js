import { Link } from 'react-router-dom'

export default function SideBar({ active }) {
  return (
    <div id='lnb'>
      <h2>숙소관리</h2>
      <a href='#' className='menu close'>
        <span className='hidden'>메뉴열기/닫기</span>
      </a>
      <ul>
        <li>
          <Link className={active === 0 ? 'on' : ''} to={'/accommodationManagement/accommodation'}>
            숙소등록관리
          </Link>
        </li>
        <li>
          <Link className={active === 1 ? 'on' : ''} to={'/accommodationManagement/roomType'}>
            객실타입등록관리
          </Link>
        </li>
        <li>
          <Link className={active === 2 ? 'on' : ''} to={'/accommodationManagement/room'}>
            객실등록관리
          </Link>
        </li>
      </ul>
    </div>
  )
}
