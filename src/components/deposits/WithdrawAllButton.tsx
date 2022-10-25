import { useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import WithdrawAllDialog from "../dialogs/WithdrawAllDialog"

export default function WithdrawAllButton() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        console.log("closeModal")
        setIsOpen(false)
    }

    function openModal() {
        console.log("openModal")
        setIsOpen(true)
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Withdraw All</span>
                </div>
            </button>
            <WithdrawAllDialog isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}