import { createTheme } from '@mui/material/styles'
import { yellow, lightGreen } from '@mui/material/colors'
import { ptBR } from '@mui/x-data-grid/locales'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: lightGreen['A700']
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold'
    }
  }
}, ptBR)

export default theme