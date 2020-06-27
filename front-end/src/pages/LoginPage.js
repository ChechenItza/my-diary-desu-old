import React from 'react'
import styled from 'styled-components'
import { GoogleLogin } from 'react-google-login'

import  '../styles/googleBtn.css'
import colors from '../constants/colors'
import loginService from '../services/login'
import entryService from '../services/entries'

const LoginForm = styled.div`
  width: 300px;
  height: 220px;
  background-color: #ffffff;
  box-shadow: ${colors.shadow};
  border-radius: 5px;

  padding: 30px;
`

const SignInText = styled.p`
  margin: 0 auto 10px; 
  font-family: 'Open Sans','Noto Sans Myanmar UI',arial,sans-serif;
  line-height: 1.3333;
  font-size: 1.5rem;
  font-weight: 400;
  width: max-content;
`

const SignInSubText = styled.p`
  margin: 0 auto 40px;
  font-family: 'Open Sans','Noto Sans Myanmar UI',arial,sans-serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: .1px;
  line-height: 1.5;
  width: max-content;
`

const LoginBtnWrapper = styled.div`
  margin: 0 auto;
  width: max-content;
`

const LoginPage = ({ setUser }) => {
  const authenticate = async (code) => {    
    const token = await loginService.auth(code.profileObj.googleId, code.profileObj.name)
    entryService.setToken(token)

    const user = {
      token,
      name: code.profileObj.name
    } 
    setUser(user)

    window.localStorage.setItem('user', token)
    window.localStorage.setItem('username', code.profileObj.name)
  }

  const printError = (err, details) => {
    console.error(`err: ${err}`)
    console.error(`details: ${details}`)
  }

  return (
    <LoginForm>
      <SignInText>Sign in</SignInText>
      <SignInSubText>to continue using this app</SignInSubText>
      <LoginBtnWrapper>
        <GoogleLogin
          clientId='571051428609-3lt1sq0sfe4qqrd67kcj0suo5af5006n.apps.googleusercontent.com'
          render={renderProps => (
            <div className="google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <div className="google-icon-wrapper">
                <img className="google-icon" alt="google-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
              <p className="btn-text"><b>Sign in with google</b></p>
            </div>
          )}
          buttonText='Sign in with google'
          onSuccess={authenticate}
          onFailure={printError}
        />
      </LoginBtnWrapper>
    </LoginForm>
  )
}

export default LoginPage