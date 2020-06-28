import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import colors from '../constants/colors'
import linkGenerator from '../utils/linkGenerator'
import entryService from '../services/entries'

const CalendarStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(auto, 1fr));
  grid-template-rows: repeat(6, minmax(auto, 1fr));
  flex: 1;

  box-shadow: ${colors.shadow};
`

const DayCell = styled.div`
  position: relative;
  padding: 0.7rem;
  background-color: ${colors.button};
  border-top: 1px solid ${colors.border};
  border-right: ${props => props.last ? '0px' : '1px solid ' + colors.border};

  font-size: 0.8rem;

  &:hover {
    filter: brightness(96%);
    cursor: pointer;
  }
`

const EmptyCell = styled(DayCell)`
  background-color: ${colors.background};

  &:hover {
    filter: brightness(100%);
    cursor: default;
  }
`

const Today = styled.span`
  border-bottom: 0.3rem solid ${colors.primaryLight};
  padding-bottom: 0.1rem;
` 

const EntryIndicator = styled.span`
  position: absolute;
  right: 0.7rem;

  font-size: 1.2em;
  line-height: 1em;
  font-weight: bold;
  color: ${colors.primary};
`

let memoizeDatesWithEntries = {}

const Calendar = ({ date }) => {
  const [datesWithEntries, setDatesWithEntries] = React.useState([])

  const history = useHistory()
  const openJournalPage = (day) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), day)

    const location = {
      pathname: '/entry/' + linkGenerator.genEntryLink(newDate),
      state: { fromCalendar: true }
    }
    history.push(location)
  }

  const handleDayClick = (e, day) => {
    e.preventDefault()
    openJournalPage(day)
  }

  const isToday = (day) => {
    const now = new Date()
    const selected = new Date(date.getFullYear(), date.getMonth(), day)

    return (
      now.getFullYear() === selected.getFullYear() &&
      now.getMonth() === selected.getMonth() &&
      now.getDate() === selected.getDate()
    )

  }

  const hasEntry = (day) => {
    const selected = new Date(date.getFullYear(), date.getMonth(), day)
    const dateStr = linkGenerator.genEntryLink(selected)
    if (memoizeDatesWithEntries[dateStr])
      return true

    if (datesWithEntries.find(elem => elem === dateStr)) {
      memoizeDatesWithEntries[dateStr] = true
      return true
    } else {
      return false
    }
  }

  const generateCalendar = () => { 
    let calendar = []

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    for (let i = 0; i < firstDay; i++)
      calendar.push(<EmptyCell key={calendar.length}/>)

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++)
      calendar.push(
        <DayCell 
          key={calendar.length}
          onClick={(e) => { handleDayClick(e, day); }}
          last={(calendar.length + 1) % 7 === 0}
        >
          {isToday(day) ? <Today>{day}</Today> : <span>{day}</span>}
          {hasEntry(day) ? <EntryIndicator>●</EntryIndicator> : <></>}
        </DayCell>
      )

    while (calendar.length < 42)
      calendar.push(
        <EmptyCell 
          key={calendar.length}
          last={(calendar.length + 1) % 7 === 0}
        />
      )
    
    return calendar
  }

  useEffect(() => {
    (async () => {
      const dates = await entryService.getAll()
      if (dates !== undefined)
        setDatesWithEntries(dates)
    })()
  }, [date])

  return (
    <CalendarStyled>
      {generateCalendar()}
    </CalendarStyled>
  )
}

export default Calendar