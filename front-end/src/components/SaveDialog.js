import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const AlertDialog = ({ show, setShowAlert, saveEntry, setEntryTooLarge }) => {
  const handleClose = () => {
    setShowAlert(false)
  }

  const history = useHistory()
  const goBack = () => {
    history.goBack()
    handleClose()
  }

  const goBackSaved = async () => {
    try {
      await saveEntry()
    } catch(error) {
      if (error.response.status === 413) {
        setEntryTooLarge(true)
        handleClose()
      } else {
        console.error(error)
      }
      return
    }
    goBack()
  }

  return (
    <>
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="save-dialog-title"
      aria-describedby="save-dialog-description"
    >
      <DialogTitle id="save-dialog-title">{"Unsaved changes"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="save-dialog-description">
          There are unsaved changes. Do you wish to save before leaving?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={goBack} color="primary">
          Don't Save
        </Button>
        <Button onClick={goBackSaved} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default AlertDialog