import React from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import myfetch from '../../lib/myfetch'

export default function SqliChallenge() {
  const [form, setForm] = React.useState({ username: '', password: '' })
  const [result, setResult] = React.useState(null)
  const [error, setError] = React.useState(null)

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setResult(null)
    setError(null)
    try {
      setResult(await myfetch.post('/challenges/sqli/login', form))
    }
    catch(error) {
      setError(error.message)
    }
  }

  return <Stack spacing={3}>
    <Typography variant="h1">Desafio: SQL Injection</Typography>
    <Alert severity="warning">
      A consulta de login concatena os valores enviados de propósito. Use somente dados de laboratório.
    </Alert>
    {error && <Alert severity="error">{error}</Alert>}
    {result && <Alert severity={result.success ? 'success' : 'info'}>
      {result.message}{result.flag ? ` Flag: ${result.flag}` : ''}
    </Alert>}
    {result?.flag && <Paper sx={{ p: 3, overflow: 'auto' }}>
      <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>Resultado da consulta</Typography>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(result.result, null, 2)}
      </pre>
    </Paper>}
    <Paper sx={{ p: 3, maxWidth: '500px' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="username" label="Usuário" value={form.username} onChange={handleChange} required />
          <TextField name="password" label="Senha" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained" color="secondary">Testar login</Button>
        </Stack>
      </form>
    </Paper>
  </Stack>
}
