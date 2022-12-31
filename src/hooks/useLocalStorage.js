import { useState, useEffect } from 'react'

const useLocalStorage = (key, value) => {
  const [state, setState] = useState(value)
  const localStorageValue = localStorage.getItem(key)

  useEffect(() => {
      if (localStorageValue) {
          setState(JSON.parse(localStorageValue))
      } else {
          localStorage.setItem(key, JSON.stringify(value))
      }
  }, [])

  const update = (to) => {
      setState(to)
      localStorage.setItem(key, JSON.stringify(to))
  }

  const remove = (key) => {
      setState(null)
      localStorage.removeItem(key)
  }

  return [state, update, remove]
}

export default useLocalStorage