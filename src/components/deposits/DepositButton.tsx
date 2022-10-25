import { FaArrowAltCircleUp } from "react-icons/fa"

export default function DepositButton() {

    return (
        <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-emerald-500 text-emerald-500 hover:border-emerald-400 hover:text-emerald-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100">
            <div className="flex items-center gap-2">
                <FaArrowAltCircleUp className="h-4" />
                <span>Deposit</span>
            </div>
        </button>
    )
}