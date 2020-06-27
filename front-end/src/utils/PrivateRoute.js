import React from 'react'
import {
  Redirect, Route
} from 'react-router-dom'

const PrivateRoute = ({ user, children, ...rest }) => {
  return (
    <Route {...rest}>
      {
        user
          ? children
          : <Redirect to='/login' />
      } 
    </Route>
  )
}

export default PrivateRoute