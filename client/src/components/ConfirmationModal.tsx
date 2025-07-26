import Modal from "./Modal"

interface Props {
  title?: string
  isOpenModal: boolean
  closeModal(): void
  onConfirm(): void
}
const ConfirmationModal = ({ title = "", isOpenModal, closeModal, onConfirm }: Props) => {

  return (
    <Modal
      title={title}
      isOpen={isOpenModal}
      close={closeModal}
    >
      <div>
        <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this audio?</h3>
        <div className="flex items-center justify-center p-4 md:p-5">
          <button onClick={onConfirm} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer">Yes, I'm sure</button>
          <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 hover:cursor-pointer">No, cancel</button>
        </div>
      </div>

    </Modal>
  )
}

export default ConfirmationModal