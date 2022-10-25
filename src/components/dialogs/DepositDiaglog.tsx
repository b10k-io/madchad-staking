import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
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
                    <span>Deposit Tokens</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">
                <DepositForm />
            </div>

            {/* <div className="mt-4">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                >
                    Got it, thanks!
                </button>
            </div> */}
        </DialogWrapper>
    )
}
