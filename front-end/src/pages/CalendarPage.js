import React from 'react'

import CalendarBar from '../components/CalendarBar'
import WeekPanel from '../components/WeekPanel'
import Calendar from '../components/Calendar'

const CalendarPage = ({ date, username, setDate, logout }) => {
  return (
    <>
    <CalendarBar date={date} username={username} setDate={setDate} logout={logout}/>
    <WeekPanel />
    <Calendar setDate={setDate} date={date} />
    </>
  )
}

export default CalendarPage