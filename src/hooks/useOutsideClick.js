import { useEffect } from 'react'
import { useRef } from 'react'

export const useOutsideClick = (handler, isCapture = true) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, isCapture)

    return () => {
      document.removeEventListener('click', handleClick, isCapture)
    }
  }, [handler, isCapture])

  return ref
}
