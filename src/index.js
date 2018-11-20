import React from 'react';
import ReactDOM from 'react-dom';
import App from "components/common/App";
import { Provider } from "react-redux";
import store from 'redux/configureStore';
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#738fe9',
        main: '#5173E4',
        dark: '#38509f',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffb033',
        main: '#FF9D00',
        dark: '#b26d00',
        contrastText: '#fff',
      }
    },
    typography: {
        useNextVariants: true,
    },
    props: {
        MuiButtonBase: {
          disableRipple: true,
        }
    }
  });

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
                </MuiThemeProvider>
            </BrowserRouter>
    </Provider>, document.getElementById('root'));



