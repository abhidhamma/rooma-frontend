import { currentAccommodationAtom } from '@state/common/common'
import { Suspense, useState } from 'react'
import { useRecoilValue } from 'recoil'
import DayPriceManagement from '../Tab/DayPriceManagement/DayPriceManagement'
import RoomTypePriceManagement from '../Tab/RoomTypePriceManagement/RoomTypePriceManagement'
import TermPriceManagement from '../Tab/TermPriceManagement/TermPriceManagement'

export default function PriceManagementContainer() {
  console.log('PriceManagementList called...')
  const [currentTabFlag, setCurrentTabFlag] = useState('roomTypePriceManagement')

  const changeTab = (tabData) => {
    setCurrentTabFlag(tabData)
  }

  const isRoomTypePriceManagementTab = currentTabFlag === 'roomTypePriceManagement'
  const isTermPriceManagementTab = currentTabFlag === 'termPriceManagement'
  const isDayPriceManagementTab = currentTabFlag === 'dayPriceManagement'

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
            <li className={isRoomTypePriceManagementTab ? 'current' : ''} data-tab='priceTab1'>
              <a href='#' onClick={() => changeTab('roomTypePriceManagement')}>
                객실타입별요금관리
              </a>
            </li>
            <li className={isTermPriceManagementTab ? 'current' : ''} data-tab='priceTab2'>
              <a href='#' onClick={() => changeTab('termPriceManagement')}>
                기간별요금관리
              </a>
            </li>
            <li className={isDayPriceManagementTab ? 'current' : ''} data-tab='priceTab3'>
              <a href='#' onClick={() => changeTab('dayPriceManagement')}>
                날짜별요금관리
              </a>
            </li>
          </ul>

          <Suspense fallback={<div></div>}>
            <RoomTypePriceManagement isRoomTypePriceManagementTab={isRoomTypePriceManagementTab} />
          </Suspense>
          <TermPriceManagement isTermPriceManagementTab={isTermPriceManagementTab} />
          <DayPriceManagement isDayPriceManagementTab={isDayPriceManagementTab} />
        </div>
      </div>
      {/* <!-- E:content --> */}
    </div>
    // <!-- E:Container -->
  )
}
