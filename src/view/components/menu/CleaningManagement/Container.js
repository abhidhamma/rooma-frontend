import { Suspense } from 'react'
import CleaningStatusHeader from './CleaingStatusHeader'
import CleaningSchedulerContent from './CleaningSchedulerContent'
import CleaningSchedulerHeader from './CleaningSchedulerHeader'

export default function CleaningManagementContainer() {
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='full-content reserv-state'>
          <CleaningStatusHeader />
          <div className='timetable'>
            <CleaningSchedulerHeader />
            <div className='scheduler-view'>
              <Suspense fallback={<div></div>}>
                <CleaningSchedulerContent />
              </Suspense>
            </div>
          </div>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
