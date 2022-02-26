import { useRecoilValue } from 'recoil'
import { overlayAtom } from '../../../../service/state/reservation'

export default function SourceOverlay() {
  const overlay = useRecoilValue(overlayAtom)
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `calc(${overlay.hoverLength}00% + ${overlay.hoverLength}px)`,
        zIndex: 1,
        opacity: 0.7,
        backgroundColor: 'white',
        border: `3px solid ${overlay.hoverColor}`,
      }}></div>
  )
}
