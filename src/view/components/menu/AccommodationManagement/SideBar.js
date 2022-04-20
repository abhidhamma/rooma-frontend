import { ACCOMMODATION_LIST_URL, ROOMTYPE_LIST_URL, ROOM_LIST_URL } from '@constant/locationURLs'
import { sidebarOpenAtom } from '@state/common/common'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'

export default function SideBar({ active }) {
  const [menuOpen, setMenuOpen] = useRecoilState(sidebarOpenAtom)

  useEffect(() => {
    return () => {
      setMenuOpen(true)
    }
  }, [])
  return (
    <div id='lnb' style={{ width: menuOpen ? '250px' : '65px' }}>
      {menuOpen && <h2>숙소관리</h2>}
      <a
        href='#'
        className={menuOpen ? 'menu close' : 'menu close open'}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className='hidden'>메뉴열기/닫기</span>
      </a>
      {menuOpen && (
        <ul>
          <li>
            <Link className={active === 0 ? 'on' : ''} to={ACCOMMODATION_LIST_URL}>
              숙소등록관리
            </Link>
          </li>
          <li>
            <Link className={active === 1 ? 'on' : ''} to={ROOMTYPE_LIST_URL}>
              객실타입등록관리
            </Link>
          </li>
          <li>
            <Link className={active === 2 ? 'on' : ''} to={ROOM_LIST_URL}>
              객실등록관리
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}
