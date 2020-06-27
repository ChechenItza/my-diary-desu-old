import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import validator from 'validator'

import {
  Switch, Route, Redirect, useRouteMatch
} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

import CalendarPage from './pages/CalendarPage'
import JournalPage from './pages/JournalPage' 
import LoginPage from './pages/LoginPage'

import colors from './constants/colors'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3.5% 21%;
  background: linear-gradient(to bottom, ${colors.gradient1} 0%, ${colors.gradient1} 13%, ${colors.gradient1} 13%, ${colors.gradient2} 13%, ${colors.gradient2} 100%);
  @media (max-width: 1025px) {
    padding: 3.5% 10%;
  }
  @media (max-width: 680px) {
    padding: 3.5% 1%;
  }
  @media (max-width: 570px) {
    padding: 0;
  }
  @media (max-width: 420px) and (min-height: 600px) {
    padding-bottom: 30%;
  }
  @media (max-width: 420px) and (min-height: 800px) {
    padding-bottom: 40%;
  }
`

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 8%; 
  background: linear-gradient(to bottom, ${colors.gradient1} 0%, ${colors.gradient1} 23%, ${colors.gradient1} 23%, ${colors.gradient2} 23%, ${colors.gradient2} 100%);
  @media (max-width: 680px) {
    padding-top: 3.5%;
  }
  @media (max-width: 570px) {
    padding-top: 0;
    justify-content: center;
  }
`

const App = () => {
  const [date, setDate] = useState(new Date())
  const [user, setUser] = useState(
    window.localStorage.getItem('user') ? 
      {
        token: window.localStorage.getItem('user'),
        name: window.localStorage.getItem('username')
      }
      : null
  )

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('username')
    setUser(null)
  }  
  
  let journalDate = date
  let invalidDateUrl = false
  const match = useRouteMatch('/entry/:date')
  if (match) {
    const newDate = validator.toDate(match.params.date)
    if (newDate) 
      journalDate = newDate
    else
      invalidDateUrl = true
  }

  const dateUpdatable = journalDate !== date
  useEffect(() => {
    setDate(journalDate)
  }, [dateUpdatable])

  return (
    <Switch>
      <PrivateRoute user={user} exact path="/">
        <PageWrapper>
          <CalendarPage 
            date={date} 
            username={user ? user.name : ''}
            setDate={setDate}
            logout={logout}
          />
        </PageWrapper>
      </PrivateRoute>
      <Route exact path="/login">
      {
        user ?
          <Redirect to="/" /> :
          <LoginPageWrapper>
            <LoginPage setUser={setUser}/>
          </LoginPageWrapper>
      }
      </Route>
      <PrivateRoute user={user} path="/entry/:date">
        <PageWrapper>
          {
            invalidDateUrl ? 
              <Redirect to="/" /> :
              <JournalPage date={journalDate}/>
          }
        </PageWrapper>
      </PrivateRoute>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}

export default App
