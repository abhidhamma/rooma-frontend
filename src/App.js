import Router from '@router/Router'
import { rightClickPopupAtom } from '@state/reservationStatus/reservationStatus'
import { useSetRecoilState } from 'recoil'

function App() {
  const setShow = useSetRecoilState(rightClickPopupAtom)
  const hideRightClickPopup = () => {
    setShow((prev) => ({ ...prev, display: 'none' }))
  }
  return (
    <div className='Wrap' onClick={hideRightClickPopup}>
      <Router />
    </div>
  )
}

export default App
