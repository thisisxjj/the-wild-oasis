import GlobalStyles from './styles/GlobalStyles'
import Heading from './ui/Heading'
import Button from './ui/Button'
import Input from './ui/Input'
import Row from './ui/Row'

function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <Row type="horizontal">
          <Heading as="h1">Hello World</Heading>
          <div>
            <Heading as="h2">Check in and out</Heading>
            <Button>Check In</Button>
            <Button variation="secondary" size="large">
              Check Out
            </Button>
          </div>
        </Row>
        <Row>
          <Heading as="h3">Form</Heading>
          <form>
            <Input type="number" placeholder="Number of Guest" />
            <Input type="number" placeholder="Number of Guest" />
          </form>
        </Row>
      </Row>
    </>
  )
}

export default App
