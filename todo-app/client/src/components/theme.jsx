import { createMuiTheme } from '@material-ui/core/styles';

const Theme1 = createMuiTheme({
    palette: {
        primary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff'
        },
        secondary: {
            light: '#EF5350',
            main: '#D32F2F',
            dark: '#B71C1C',
            contrastText: '#fff'
        }
    },
    typography: {
      useNextVariants: true,
    },
  });

  const Theme2 = createMuiTheme({
    palette: {
        primary: {
            light: '#EF5350',
            main: '#D32F2F',
            dark: '#B71C1C',
            contrastText: '#fff'
          },
        secondary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff'
        }
    },
    typography: {
      useNextVariants: true,
    },
  });


export {Theme1, Theme2};