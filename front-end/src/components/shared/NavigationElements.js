import React from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiIcon from '@material-ui/core/Icon'

import colors from '../../constants/colors'

export const IconButton = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}))(MuiIconButton)

export const Icon = withStyles((theme) => ({
  root: {
    color: '#ffffff'
  },
}))(MuiIcon)

const HiddenIconButton = withStyles((theme) => ({
  root: {
    visibility: "hidden",
  },
}))(MuiIconButton)

export const Spacer = () => {
  return (
    <HiddenIconButton>
      <Icon>settings</Icon>
    </HiddenIconButton>
  )
}

export const SideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const NavigationBar = styled.div`
  background-color: ${colors.primary};
  height: 4.8rem;

  border-radius: 15px 15px 0 0;

  flex-shrink: 0;

  padding: 0 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: ${colors.shadow};

  @media (max-width: 570px) {
    border-radius: 0;
  }
  @media (max-width: 500px), (max-height: 700px) {
    height: 4rem;
  }
`