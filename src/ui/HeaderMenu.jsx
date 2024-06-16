import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import Logout from '../features/authentication/Logout'
import UserAvatar from '../features/authentication/UserAvatar'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

function HeaderMenu() {
  const navigate = useNavigate()

  return (
    <StyledHeaderMenu>
      <li>
        <UserAvatar onClick={() => navigate('/account')} />
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
