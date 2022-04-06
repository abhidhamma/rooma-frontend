import Router from '@router/Router'
import { dimmdLayerAtom } from '@state/common/common'
import {
  isMouseDownAtom,
  rightClickPopupAtom,
  selectedCellArrayAtom,
} from '@state/reservationStatus/reservationStatus'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

function App() {
  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownAtom)
  const setSelectedCellArray = useSetRecoilState(selectedCellArrayAtom)
  const isShowDimmdLayer = useRecoilValue(dimmdLayerAtom)
  const setShow = useSetRecoilState(rightClickPopupAtom)
  const hideRightClickPopup = () => {
    setShow((prev) => ({ ...prev, display: 'none' }))
  }

  const handleMouseUp = () => {
    if (isMouseDown) {
      setIsMouseDown(false)
      setSelectedCellArray({})
    }
  }
  return (
    <>
      <div className='Wrap' onClick={hideRightClickPopup} onMouseUp={handleMouseUp}>
        <Router />
      </div>
      {isShowDimmdLayer && <div id='dimmd-layer'></div>}
    </>
  )
}

export default App
