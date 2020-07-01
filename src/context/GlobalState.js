import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// Initial state
const initialState = {
  transactions: [],
  days: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get('http://localhost:8000/api/militar/read.php')

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  async function getDays() {
    try {
      const res = await axios.get('http://localhost:8000/api/arranchamento/read_data.php?data=2020-06-01')

      dispatch({
        type: 'GET_DAYS',
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'DAYS_ERROR',
        payload: err.response.data.error
      })
    }
  }

  return(<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    days: state.days,
    getTransactions,
    getDays
  }}>
    {children}
  </GlobalContext.Provider>)
}