import Router from '@router/Router'
import { dimmdLayerAtom } from '@state/common/common'
import { rightClickPopupAtom } from '@state/reservationStatus/reservationStatus'
import { useRecoilValue, useSetRecoilState } from 'recoil'

function App() {
  const isShowDimmdLayer = useRecoilValue(dimmdLayerAtom)
  const setShow = useSetRecoilState(rightClickPopupAtom)
  const hideRightClickPopup = () => {
    setShow((prev) => ({ ...prev, display: 'none' }))
  }
  return (
    <>
      <div className='Wrap' onClick={hideRightClickPopup}>
        <Router />
      </div>
      {isShowDimmdLayer && <div id='dimmd-layer'></div>}
    </>
  )
}

export default App
