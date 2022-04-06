export default function Day({ day, md, dayOfWeek, isToday, isSaturday, isSunday, isSameMonth }) {
  return (
    <div className={isSaturday ? 'sat' : '' || isSunday ? 'sun' : ''}>
      <p>{isSameMonth ? day : md}</p>
      <p>
        <span className='day'>{dayOfWeek}</span>
      </p>
      {isToday && <span className='today'>Today</span>}
    </div>
  )
}
