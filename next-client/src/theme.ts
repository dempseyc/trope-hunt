import { createTheme } from "@mui/material/styles";
import { teal, amber } from "@mui/material/colors";

const purple = {
  50: '#f3e8f6',
  100: '#e1c5e9',
  200: '#ce9fda',
  300: '#ba79cb',
  400: '#ab5cc0',
  500: '#9c3fb5',
  600: '#9439ae',
  700: '#8a31a5',
  800: '#80299d',
  900: '#6e1b8d',
  A100: '#eec6ff',
  A200: '#df93ff',
  A400: '#d160ff',
  A700: '#c947ff',
  'contrastDefaultColor': 'light',
};



const theme = createTheme({
  palette: {
    primary: {
      main: teal[900],
      light: teal[400],
    },
    secondary: {
      main: purple[900],
    },
  },
  typography: {
    fontFamily: "sans-serif",
    fontSize: 20,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          width: "25%",
          fontSize: 15,
          margin: "0.5rem",
          padding: "0.5rem",
          label: {
            color: "#ffffff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
          lineHeight: "inherit",
          margin: "0.2em",
          color: "white",
          border: "none",
        },
        textSecondary: {
          color: teal[900],
          backgroundColor: "white",
        },
        outlinedPrimary: {
          color: teal[900],
          backgroundColor: "white",
          border: "1px solid",
          borderColor: teal[900],
          ":focus": {
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: teal[200],
          },
          ":hover": {
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: teal[200],
          },
        },
        outlinedSecondary: {
          color: purple[900],
          backgroundColor: "white",
          border: "1px solid",
          borderColor: purple[900],
          ":focus": {
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: purple[200],
          },
          ":hover": {
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: purple[200],
          },
        },
        textPrimary: {
          ":focus": {
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: teal[400],
          },
          ":hover": {
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: teal[400],
          },
        },
        containedPrimary: {
          backgroundColor: teal[900],
          color: "white",
          borderColor: teal[900],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffffff",
          height: "100%",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: "100%",
          minHeight: "1em",
        },
        flexContainer: {
          height: "100%",
        },
        indicator: {
          backgroundColor: amber[400],
          height: "2px",
          borderRadius: "2px 2px 0 0",
          boxShadow: `0 0px 4px ${amber[900]}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: "1em",
          "&.Mui-selected": {
            color: "#000000ff",
          },
          minWidth: "75px",
          "&>.MuiTab-iconWrapper": {
            marginBottom: "0px",
          }
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          margin: "8px 10px",
          marginBottom: "40px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
          width: "1.5em",
          height: "1.5em",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "1px solid #ffd54f",
          // borderColor: amber[300],
        },
      },
    },
  },
});

export default theme;
