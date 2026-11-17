import React from 'react'
import Typography from '@mui/material/Typography'

export default function Homepage() {
  const [cookies, setCookies] = React.useState([])

  React.useEffect(() => {
    const data = document.cookie
      .split(';')
      .filter(cookie => cookie.trim() !== '')
      .map(cookie => {
        const [key, ...value] = cookie.trim().split('=')

        return {
          key,
          value: decodeURIComponent(value.join('='))
        }
      })

    setCookies(data)
  }, [])

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Projeto VULCOM
      </Typography>

      <Typography>
        Sistema para análise e estudo de vulnerabilidades comuns
      </Typography>

      <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
        Cookies encontrados
      </Typography>

      <Typography>
        Cookies acessíveis nesta página via document.cookie. Cookies HttpOnly
        não podem ser lidos pelo JavaScript.
      </Typography>

      {cookies.length === 0 ? (
        <Typography>Nenhum cookie encontrado.</Typography>
      ) : (
        <ul>
          {cookies.map(cookie => (
            <li key={`${cookie.key}=${cookie.value}`}>
              <Typography component="div">
                <strong>Nome:</strong> {cookie.key}
              </Typography>

              <Typography
                component="pre"
                sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
              >
                {cookie.value}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
