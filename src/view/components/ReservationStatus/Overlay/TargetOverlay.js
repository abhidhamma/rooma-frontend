export default function TargetOverlay({ data }) {
  return (
    <div
      style={{
        display: 'grid',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `calc(${data.hoverLength}00% + ${data.hoverLength}px)`,
        zIndex: 1,
        backgroundColor: data.hoverColor,
        color: 'white',
      }}>
      <div style={{ placeSelf: 'center' }}>{data.hoverData}</div>
    </div>
  )
}
