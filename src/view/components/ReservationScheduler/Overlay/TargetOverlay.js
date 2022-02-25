import { useRecoilValue } from 'recoil'
import { overlayAtom } from '../../../../service/state/reservation/atom'

export default function TargetOverlay() {
  const overlay = useRecoilValue(overlayAtom)
  return (
    <div
      style={{
        display: 'grid',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `calc(${overlay.hoverLength}00% + ${overlay.hoverLength}px)`,
        zIndex: 1,
        backgroundColor: overlay.hoverColor,
        color: 'white',
      }}>
      <div style={{ placeSelf: 'center' }}>{overlay.hoverData}</div>
    </div>
  )
}
