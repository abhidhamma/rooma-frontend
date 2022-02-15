export default function SourceOverlay({ data }) {
  const { hoverColor, hoverData, hoverLength } = data
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${hoverLength}00%`,
        zIndex: 1,
        opacity: 0.7,
        backgroundColor: 'white',
        border: `3px solid ${hoverColor}`,
      }}></div>
  )
}
