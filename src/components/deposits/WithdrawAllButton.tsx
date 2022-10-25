import { FaArrowAltCircleDown } from "react-icons/fa"

export default function WithdrawAllButton() {

    return (
        <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100">
            <div className="flex items-center gap-2">
                <FaArrowAltCircleDown className="h-4" />
                <span>Withdraw All</span>
            </div>
        </button>
    )
}