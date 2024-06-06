import { cloneElement } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'

const ModalContainer = styled.div`
  position: relative;
  z-index: 1000;
`

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`

const ModalContext = createContext()

function Modal({ children }) {
  const [openName, setOpenName] = useState('')
  const onClose = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ open, onClose, openName }}>
      {children}
    </ModalContext.Provider>
  )
}

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

function Window({ children, name }) {
  const { openName, onClose } = useContext(ModalContext)

  if (name !== openName) return null

  return createPortal(
    <ModalContainer>
      <Overlay onClick={() => onClose()}></Overlay>

      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: onClose })}</div>
      </StyledModal>
    </ModalContainer>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
