import { Suspense, useState } from 'react'
import CalendarPriceManagement from '../Tab/CalendarPriceManagement/CalendarPriceManagement'
import RoomTypePriceManagement from '../Tab/RoomTypePriceManagement/RoomTypePriceManagement'
import PeriodPriceManagement from '../Tab/PeriodPriceManagement/PeriodPriceManagement'

export default function PriceManagementContainer() {
  console.log('PriceManagementList called...')
  const [currentTabFlag, setCurrentTabFlag] = useState('calendarPriceManagement')

  const changeTab = (tabData) => {
    setCurrentTabFlag(tabData)
  }

  const isRoomTypePriceManagementTab = currentTabFlag === 'roomTypePriceManagement'
  const isPeriodPriceManagementTab = currentTabFlag === 'periodPriceManagement'
  const isCalendarPriceManagementTab = currentTabFlag === 'calendarPriceManagement'

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
            <li className={isPeriodPriceManagementTab ? 'current' : ''} data-tab='priceTab2'>
              <a href='#' onClick={() => changeTab('periodPriceManagement')}>
                기간별요금관리
              </a>
            </li>
            <li className={isCalendarPriceManagementTab ? 'current' : ''} data-tab='priceTab3'>
              <a href='#' onClick={() => changeTab('calendarPriceManagement')}>
                날짜별요금관리
              </a>
            </li>
          </ul>

          <Suspense fallback={<div></div>}>
            <RoomTypePriceManagement isRoomTypePriceManagementTab={isRoomTypePriceManagementTab} />
          </Suspense>
          <Suspense fallback={<div></div>}>
            <PeriodPriceManagement isPeriodPriceManagementTab={isPeriodPriceManagementTab} />
          </Suspense>

          <CalendarPriceManagement isCalendarPriceManagementTab={isCalendarPriceManagementTab} />
        </div>
      </div>
      {/* <!-- E:content --> */}
    </div>
    // <!-- E:Container -->
  )
}
