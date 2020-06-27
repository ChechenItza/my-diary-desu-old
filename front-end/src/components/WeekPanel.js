import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

const Panel = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(auto, 1fr));
  grid-template-rows: 1fr;
  height: 1.8rem;

  background-color: ${colors.background};

  box-shadow: ${colors.shadow};
`

const DayOfWeek = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  border-top: 1px solid ${colors.border};
  border-right: ${props => props.last ? '0px' : '1px solid ' + colors.border};
  flex: 1;

  font-size: 0.88rem;
  font-weight: bold;
`

const WeekPanel = () => (
  <Panel>
      <DayOfWeek>Sun</DayOfWeek>
      <DayOfWeek>Mon</DayOfWeek>
      <DayOfWeek>Tue</DayOfWeek>
      <DayOfWeek>Wed</DayOfWeek>
      <DayOfWeek>Thu</DayOfWeek>
      <DayOfWeek>Fri</DayOfWeek>
      <DayOfWeek last>Sat</DayOfWeek>
  </Panel>
)

export default WeekPanel