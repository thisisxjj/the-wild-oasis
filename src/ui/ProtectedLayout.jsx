import { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { useUser } from '../features/authentication/useUser'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedLayout({ children }) {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  return children
}

export default ProtectedLayout
