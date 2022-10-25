import { Dialog } from '@headlessui/react'
import { IDepositDialog } from '../../types/dialogs'
import DialogWrapper from './DialogWrapper'
import { FaTimes } from "react-icons/fa"
import { FaArrowAltCircleDown } from "react-icons/fa"

const tdClass = "text-sm text-right py-1 text-slate-900 border-slate-200"

export default function WithdrawDialog({ isOpen, openModal, closeModal }: IDepositDialog) {

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <div className='flex flex-col gap-8'>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-slate-900 uppercase"
                >
                    <div className='flex items-center justify-between'>
                        <span>Withdraw Deposit</span>
                        <button onClick={closeModal}><FaTimes /></button>
                    </div>
                </Dialog.Title>
                <div>
                    <div className='p-3 text-sm bg-amber-100 rounded border-0 border-amber-300 text-amber-900'>This deposit is less than 20 days old and is therefore subject to a 20% early withdrawl fee.</div>
                </div>

                <div>
                    <table className='table-fixed w-full'>
                        <tbody>
                            <tr>
                                <td className={tdClass}>Deposit</td>
                                <td className={tdClass}>10,000</td>
                            </tr>
                            <tr>
                                <td className={tdClass}>Fee</td>
                                <td className={tdClass}>2,000</td>
                            </tr>
                            <tr>
                                <td className={`font-semibold border-y ${tdClass}`}>You Will Receive</td>
                                <td className={`font-semibold border-y ${tdClass}`}>8,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    type="button"
                    className="rounded-md border border-transparent bg-amber-100 px-6 py-3 text-amber-900 hover:bg-amber-200 w-full text-base font-semibold"
                >
                    <div className="flex items-center justify-center gap-2">
                        <FaArrowAltCircleDown className="h-4" />
                        <span>Withdraw</span>
                    </div>
                </button>
            </div>
        </DialogWrapper>
    )
}
