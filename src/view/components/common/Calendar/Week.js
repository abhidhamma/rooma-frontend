import Day from './Day'

export default function Week({ week }) {
  return (
    <tr>
      {week.map((currentDate) => (
        <Day date={currentDate} key={currentDate} />
      ))}
    </tr>
  )
}
