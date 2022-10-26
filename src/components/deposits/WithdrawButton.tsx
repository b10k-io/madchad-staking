import { useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import WithdrawDialog from "../dialogs/WithdrawDialog"

export default function WithdrawButton() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        
        setIsOpen(false)
    }

    function openModal() {
        
        setIsOpen(true)
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Withdraw</span>
                </div>
            </button>
            <WithdrawDialog isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}