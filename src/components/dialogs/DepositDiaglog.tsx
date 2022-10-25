import { Dialog } from '@headlessui/react'
import { IDepositDialog } from '../../types/dialogs'
import DialogWrapper from './DialogWrapper'
import { FaTimes } from "react-icons/fa"
import DepositForm from '../forms/DepositForm'

export default function DepositDialog({ isOpen, openModal, closeModal }: IDepositDialog) {

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Deposit</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">
                <DepositForm />
            </div>
        </DialogWrapper>
    )
}
