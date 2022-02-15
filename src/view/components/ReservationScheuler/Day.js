export default function Day({ day, dayOfWeek, isToday, isSaturday, isSunday }) {
  return (
    <div className={isSaturday ? 'sat' : '' || isSunday ? 'sun' : ''}>
      <p>{day}</p>
      <p>
        <span className='day'>{dayOfWeek}</span>
      </p>
      {isToday && <span className='today'>Today</span>}
    </div>
  )
}
