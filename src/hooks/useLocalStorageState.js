import { useState, useEffect } from 'react'

export function useLocalStorageState(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue, key])

  return [storedValue, setStoredValue]
}
