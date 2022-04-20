import { cleaningMap, CLEANING_STATUS } from '@constant/constantVariable'
import { cleaningPopUpAtom } from '@state/cleaningManagement/cleaningStatus'
import { dimmdLayerAtom } from '@state/common/common'
import { useSetRecoilState } from 'recoil'
import WorkerSelectBox from './WorkerSelect'

export default function Cell({ currentDate, cleaning, rtNo, rmNo }) {
  console.log(cleaning)
  const setCleaningPopup = useSetRecoilState(cleaningPopUpAtom)
  const setDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const cleaningClassMap = {
    NOTREQUEST: 'ready',
    REQUEST: 'start',
    WORKING: 'ing',
    FINISHED: 'finish',
  }
  const cleaningStatusParameter = {
    rtNo,
    rmNo,
    workDate: currentDate,
    rcNo: cleaning?.rcNo === undefined ? '0' : cleaning.rcNo,
    workerId: cleaning?.workerId,
    workerName: cleaning?.workerName,
    cleaningStatus:
      cleaning?.cleaningStatus === undefined ? CLEANING_STATUS.NOTREQUEST : cleaning.cleaningStatus,
  }
  const getCleaningState = (cleaning) => {
    if (cleaning === undefined || cleaning.cleaningStatus === 'undefined') {
      return cleaningMap[CLEANING_STATUS.NOTREQUEST]
    } else {
      return cleaningMap[cleaning.cleaningStatus]
    }
  }
  const handlePopup = () => {
    setCleaningPopup({
      display: true,
      ...cleaningStatusParameter,
    })
    setDimmdLayer(true)
  }
  return (
    <div className='clean-info'>
      <a
        href='#'
        className={`clean-state ${
          cleaning === undefined
            ? cleaningClassMap['NOTREQUEST']
            : cleaning.cleaningStatus === 'undefined'
            ? cleaningClassMap['NOTREQUEST']
            : cleaningClassMap[cleaning.cleaningStatus]
        }`}
        onClick={handlePopup}
      >
        {getCleaningState(cleaning)}
      </a>
      <WorkerSelectBox cleaning={cleaning} cleaningStatusParameter={cleaningStatusParameter} />
    </div>
  )
}
