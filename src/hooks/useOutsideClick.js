import { useEffect } from 'react'
import { useRef } from 'react'

export const useOutsideClick = (handler, exclude, isCapture = true) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!exclude || exclude?.(event))
      ) {
        console.log('Click Outside')
        handler()
      }
    }

    document.addEventListener('click', handleClick, isCapture)

    return () => {
      document.removeEventListener('click', handleClick, isCapture)
    }
  }, [handler, isCapture, exclude])

  return ref
}
