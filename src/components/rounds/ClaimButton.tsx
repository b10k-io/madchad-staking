import { BigNumber } from "ethers";
import moment from "moment";
import { FaArrowAltCircleDown } from "react-icons/fa"

interface IClaimButton {
    roundIndex: BigNumber
    endTime: BigNumber
}

export default function ClaimButton({ roundIndex, endTime }: IClaimButton) {

    function isDisabled(): boolean {
        const beforeEndTime = moment().isBefore(endTime.toNumber()*1000)
        return beforeEndTime
    }

    return (
        <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-emerald-500 text-emerald-500 hover:border-emerald-400 hover:text-emerald-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" disabled={isDisabled()}>
            <div className="flex items-center gap-2">
                <FaArrowAltCircleDown className="h-4" />
                <span>Claim</span>
            </div>
        </button>
    )
}