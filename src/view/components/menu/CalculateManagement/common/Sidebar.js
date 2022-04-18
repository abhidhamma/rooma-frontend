import { Link } from 'react-router-dom'

export default function CalculateSidebar({ active }) {
  return (
    // <!-- S:lnb -->
    <div id='lnb'>
      <h2>정산관리</h2>
      <a href='#' className='menu close'>
        <span className='hidden'>메뉴열기/닫기</span>
      </a>
      <ul>
        <li>
          <Link className={active === 0 ? 'on' : ''} to={'/calculate'}>
            예약목록
          </Link>
        </li>
        <li>
          <Link className={active === 1 ? 'on' : ''} to={'/calculate/account/list'}>
            거래처별 판매현황
          </Link>
        </li>
      </ul>
    </div>
    // <!-- E:lnb -->
  )
}
