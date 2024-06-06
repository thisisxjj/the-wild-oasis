import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="add-cabin">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="add-cabin">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  )
}

export default AddCabin
