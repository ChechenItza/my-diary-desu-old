import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { IconButton, Icon } from './shared/NavigationElements'

const Settings = ({ username, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
    <IconButton aria-controls="settings-menu" aria-label="settings" onClick={handleClick}>
      <Icon>settings</Icon>
    </IconButton>
    <Menu
      id="settings-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} disabled={true}>{username}</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
    </>
  )
}

export default Settings