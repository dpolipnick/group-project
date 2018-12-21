import React from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a3d50',
    },
    secondary: {
      main: '#efbf42',
    },
  },
});

const AboutPage = () => (
   <MuiThemeProvider theme={theme}>
  <div>
    <div>
      <center>
      <h1>
        Create a User!
      </h1>
      <AdminDashboard/>
      </center>
    </div>
  </div>
  </MuiThemeProvider>
);

export default AboutPage;
