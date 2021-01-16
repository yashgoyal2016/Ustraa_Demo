import React from 'react';
import Products from './Products';
import './App.css';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
// import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';


// All the following keys are optional.
// We try our best to provide a great default value.
let theme = createMuiTheme({
  palette: {

    primary:{
      // light: will be calculated from palette.primary.main,
      main: '#d2232a',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  spacing: 2,
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
    fontFamily: `"Lato", "Roboto", sans-serif`,
 
  },
});

 theme = responsiveFontSizes(theme);
theme.spacing(2)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <Products />
    )
  }
}

export default App;
