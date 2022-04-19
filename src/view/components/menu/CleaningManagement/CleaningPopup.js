import { CLEANING_STATUS } from '@constant/constantVariable'
import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  cleaningPopUpAtom,
  cleaningStandardDateAtom,
  readCleaningStatusListSelector,
} from '@state/cleaningManagement/cleaningStatus'
import { currentAccommodationAtom, dimmdLayerAtom } from '@state/common/common'
import { updateCleaningStatusSelector } from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns'
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

export default function CleaningPopup() {
  const updateCleaningStatusCallback = useApiCallback('updateCleaningStatus')
  const [cleaningPopup, setCleaningPopup] = useRecoilState(cleaningPopUpAtom)
  const setDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const { acNo } = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(cleaningStandardDateAtom)

  const readCleaningStatusListParameter = {
    acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const resetReadCleaningStatusList = useRecoilRefresher_UNSTABLE(
    readCleaningStatusListSelector(readCleaningStatusListParameter)
  )

  const { rtNo, rmNo, workDate, rcNo } = cleaningPopup
  const cleaningStatusParameter = {
    rcNo: rcNo === undefined ? '0' : rcNo,
    acNo,
    rtNo,
    rmNo,
    workDate,
  }

  const changeCleaningStatus = (cleaningStatus) => {
    const updateCleaningStatusParameter = {
      ...cleaningStatusParameter,
      workerId: '',
      workerName: '',
      cleaningStatus,
    }
    updateCleaningStatusCallback(
      updateCleaningStatusSelector(getFormDataFromJson(updateCleaningStatusParameter))
    ).then((result) => {
      console.log(result)
      const { message } = result
      if (message === '성공') {
        resetReadCleaningStatusList()
        alert('저장되었습니다.')
      }
    })
  }
  const close = () => {
    setCleaningPopup((prev) => ({ ...prev, display: false }))
    setDimmdLayer(false)
  }
  return (
    <div
      id='cleanSelPOP'
      className='popup-box fix'
      style={{ top: '25%', left: '40%', display: cleaningPopup.display ? 'block' : 'none' }}
    >
      <div className='popWrap'>
        <a href='#' className='pop-close layer-close' onClick={close}>
          닫기
        </a>
        <div className='pop-tit'>청소상태선택</div>
        <div className='pop-cont'>
          {/* <!-- S:레이어 컨텐츠 --> */}
          <div className='clean-list'>
            <a href='#' onClick={() => changeCleaningStatus(CLEANING_STATUS.NOTREQUEST)}>
              요청전
            </a>
            <a href='#' onClick={() => changeCleaningStatus(CLEANING_STATUS.REQUEST)}>
              청소요청
            </a>
            <a href='#' onClick={() => changeCleaningStatus(CLEANING_STATUS.WORKING)}>
              청소중
            </a>
            <a href='#' onClick={() => changeCleaningStatus(CLEANING_STATUS.FINISHED)}>
              청소완료
            </a>
          </div>
          {/* <!-- E:레이어 컨텐츠 --> */}
        </div>
      </div>
    </div>
  )
}
