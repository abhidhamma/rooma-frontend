import Day from './Day'

export default function Week({ week, calendarName }) {
  return (
    <tr>
      {week.map((currentDate) => (
        <Day date={currentDate} calendarName={calendarName} key={currentDate} />
      ))}
    </tr>
  )
}
