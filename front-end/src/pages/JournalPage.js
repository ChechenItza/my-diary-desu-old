import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom"

import Snackbar from '@material-ui/core/Snackbar'
import JournalBar from '../components/JournalBar'
import Editor from '../components/Editor'
import SaveDialog from '../components/SaveDialog'

import entryService from '../services/entries'

const JournalPage = ({ date }) => {
  const [loaded, setLoaded] = useState(false)
  const [savedEntry, setSavedEntry] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [saveEnabled, setSaveEnabled] = useState(false)
  const [entryTooLarge, setEntryTooLarge] = useState(false)
  const text = useRef() 

  useEffect(() => {
    (async () => {
      const loadedEntry = await entryService.get(date)
      if (loadedEntry !== undefined) 
        text.current.getEditor().setContents(loadedEntry)
      
      setLoaded(true)
      setSavedEntry(JSON.stringify(text.current.getEditor().getContents()))
      setSaveEnabled(false)
      text.current.editor.enable(true)
      text.current.editor.setSelection(text.current.editor.getText(0).length, 0)
    })()
  }, [date])

  const history = useHistory()
  const goBack = () => {
    if (JSON.stringify(text.current.getEditor().getContents()) !== savedEntry) {
      setShowAlert(true)
    } else {
      history.push('/')
    }
  }

  const saveEntry = async () => {
    const entry = text.current.getEditor().getContents()

    try {
      var res = await entryService.post(date, entry)
    } catch(error) {
      if (error.response.status === 413) {
        setEntryTooLarge(true)
      } else {
        console.error(error)
      }
      throw error
    }

    if (res) {
      setSavedEntry(JSON.stringify(entry))
      setSaveEnabled(false)
    }
  }

  const handleAlertClose = () => {
    setEntryTooLarge(false)
  }

  return (
    <>
    <JournalBar goBack={goBack} date={date} saveEntry={saveEntry} saveEnabled={saveEnabled}/>
    <Editor text={text} loaded={loaded} saveEnabled={saveEnabled} setSaveEnabled={setSaveEnabled} savedEntry={savedEntry}/>
    <SaveDialog show={showAlert} setShowAlert={setShowAlert} saveEntry={saveEntry} setEntryTooLarge={setEntryTooLarge}/>
    <Snackbar open={entryTooLarge} autoHideDuration={6000} onClose={handleAlertClose} message={"Error! Entry is too long!"}>
    </Snackbar>
    </>
  )
}

export default JournalPage