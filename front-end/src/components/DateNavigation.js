import React from 'react'
import styled from 'styled-components'

import { IconButton, Icon } from './shared/NavigationElements' 
import colors from '../constants/colors'

const PrevMonth = ({ changeMonth }) => {
  return (
    <IconButton aria-label="prev_month" onClick={() => changeMonth(-1)}>
      <Icon>chevron_left</Icon>
    </IconButton>
  )
}

const NextMonth = ({ changeMonth }) => {
  return (
    <IconButton aria-label="next_month" onClick={() => changeMonth(1)}>
      <Icon>chevron_right</Icon>
    </IconButton>
  )
}

const DateNavigatonStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;
`
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin: 0 auto;

  min-width: 14rem;
`

const Month = styled.span`
  font-weight: bold;
  color: ${colors.icon};
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const Year = styled.span`
  font-weight: bold;
  color: ${colors.icon};
  font-size: 1rem;
`

const DateNavigaton =  ({ date, setDate }) => {
  const changeMonth = (operation) => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + operation, date.getDate())
    
    setDate(newDate)
  }

  return (
    <DateNavigatonStyled>
      <PrevMonth changeMonth={changeMonth} />
      <DateWrapper>
        <Month>{date.toLocaleString('default', { month: 'long' })}</Month>
        <Year>{date.getFullYear()}</Year>
      </DateWrapper>
      <NextMonth changeMonth={changeMonth} />
    </DateNavigatonStyled>
  )
}

export default DateNavigaton