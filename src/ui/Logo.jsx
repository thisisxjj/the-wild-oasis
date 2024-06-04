import styled from 'styled-components'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  width: auto;
  height: 9.6rem;
`

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  )
}

export default Logo
