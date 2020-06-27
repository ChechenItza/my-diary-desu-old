import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import colors from './constants/colors'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e53935',
      light: '#ff6f60',
      dark: '#ab000d'
    },
    secondary: {
      main: '#ff6f60',
      light: '#ffbcaf'
    }
  },
})

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
    width: 100vw;
  }

  html {
    font-family: 'Roboto', sans-serif;
  }
  
  @media (max-width: 570px), (max-height: 590px) {
    html {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 400px) {
    html {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 330px) {
    html {
      font-size: 0.6rem;
    }
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  .quill {
    background-color: ${colors.editorBackground};
    flex-grow: 1;

    overflow: auto;
    
    display: flex;
    flex-direction: column;

    box-shadow: ${colors.shadow};
  }

  .ql-toolbar, .ql-container {
    border-left: 0px !important;
    border-right: 0px !important;
    font-family: Roboto !important;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

