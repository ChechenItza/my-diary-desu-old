import React from 'react'

import { Spacer, NavigationBar, SideWrapper } from './shared/NavigationElements'
import DateNavigaton from './DateNavigation' 
import Settings from './SettingsButton'

const CalendarBar = ({ date, username, setDate, logout }) => {
  return (
    <NavigationBar>
      <SideWrapper>
        <Spacer />
      </SideWrapper>
      <DateNavigaton date={date} setDate={setDate}/>
      <SideWrapper>
        <Settings username={username} logout={logout}/>
      </SideWrapper>
    </NavigationBar>
  )
}

export default CalendarBar