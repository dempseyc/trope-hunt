import { createTheme } from "@mui/material/styles";
import { teal, red, amber } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[900],
      light: teal[400],
    },
    secondary: {
      main: red[900],
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
          ":focus": {
            //same as :hover
            webkitTextDecoration: "none",
            textDecoration: "none",
            backgroundColor: teal[500],
          },
          color: "white",
          border: "none",
        },
        textSecondary: {
          color: teal[900],
          backgroundColor: "white",
        },
        outlinedPrimary: {
          border: "1px solid white",
        },
        outlinedSecondary: {
          color: teal[900],
          backgroundColor: "white",
          border: "1px solid",
          borderColor: teal[900],
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
          height: "4px",
          borderRadius: "2px 2px 0 0",
          boxShadow: `0 0px 8px ${amber[900]}`,
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
