import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CarForm from '../pages/car/CarForm'
import CarList from '../pages/car/CarList'

import CustomerForm from '../pages/customer/CustomerForm'
import CustomerList from '../pages/customer/CustomerList'

import UserList from '../pages/user/UserList'
import UserForm from '../pages/user/UserForm'

import Login from '../pages/Login'
import XssChallenge from '../pages/challenges/XssChallenge'
import SqliChallenge from '../pages/challenges/SqliChallenge'

// OWASP Top 10:2025 A01 - Falha no Controle de Acesso:
// as rotas de cadastros não aplicam AuthGuard e podem ser abertas diretamente pela URL.
export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={ <Homepage /> } />

    <Route path="/login" element={ <Login /> } />

    <Route path="/challenges/xss" element={ <XssChallenge /> } />
    <Route path="/challenges/sqli" element={ <SqliChallenge /> } />

    <Route path="/cars" element={ <CarList /> } />
    <Route path="/cars/new" element={ <CarForm /> } />
    <Route path="/cars/:id" element={ <CarForm /> } />

    <Route path="/customers" element={ 
      <CustomerList /> 
    } />
    
    <Route path="/customers/new" element={ <CustomerForm />} />
    <Route path="/customers/:id" element={ <CustomerForm />  } />

    <Route path="/users" element={ <UserList /> } />
    <Route path="/users/new" element={ <UserForm /> } />
    <Route path="/users/:id" element={ <UserForm /> } />
    
  </Routes>
}
