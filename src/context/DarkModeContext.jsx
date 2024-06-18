import { createContext, useContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { useEffect } from 'react'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    'dark-mode',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    }
  }, [isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext)
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider')

  return context
}
