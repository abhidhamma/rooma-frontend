import Day from './Day'

export default function Week({ week, dateName }) {
  return (
    <tr>
      {week.map((currentDate) => (
        <Day date={currentDate} dateName={dateName} key={currentDate} />
      ))}
    </tr>
  )
}
