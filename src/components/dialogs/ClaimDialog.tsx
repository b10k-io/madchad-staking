import { Dialog } from '@headlessui/react'
import { IClaimDialog } from '../../types/dialogs'
import DialogWrapper from './DialogWrapper'
import { FaTimes } from "react-icons/fa"

export default function ClaimDialog({ roundIndex, isOpen, openModal, closeModal }: IClaimDialog) {

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Claim Rewards</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">
                <p>You can now claim your rewards.</p>
            </div>
        </DialogWrapper>
    )
}
