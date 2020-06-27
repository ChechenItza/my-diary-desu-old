import React from 'react'
import styled from 'styled-components'

import { IconButton, Icon, Spacer, NavigationBar, SideWrapper } from './shared/NavigationElements'
import colors from '../constants/colors'

const Back = ({ handleBack }) => {
  return (
    <IconButton aria-label="back" onClick={handleBack}>
      <Icon>arrow_back</Icon>
    </IconButton>
  )
}

const Save = ({ saveEntry, disabled }) => {
  return (
    <IconButton disabled={disabled} aria-label="save" onClick={saveEntry}>
      <Icon>save</Icon>
    </IconButton>
  )
}

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin: 0 1.8rem;

  min-width: 11.1875rem;
`

const Day = styled.span`
  font-weight: bold;
  color: ${colors.icon};
  font-size: 1.6rem;
  margin-right: 0.4rem;
`

const Month = styled(Day)`
  margin-right: 0.5rem;
`

const Year = styled(Day)`
  font-size: 1rem;
  margin-right: 0;
`

const JournalBar = ({ date, goBack, saveEntry, saveEnabled }) => {
  return (
    <NavigationBar>
      <SideWrapper>
        <Back handleBack={goBack} />
        <Spacer />
      </SideWrapper>
      <DateWrapper>
        <Day>{date.getDate()}</Day>
        <Month>{date.toLocaleString('default', { month: 'long' })}</Month>
        <Year>{date.getFullYear()}</Year>
      </DateWrapper>
      <SideWrapper>
        <Spacer />
        <Save disabled={!saveEnabled} saveEntry={saveEntry}>save</Save>
      </SideWrapper>
    </NavigationBar>
  )
}

export default JournalBar