import { ethers } from "ethers";
import { IRound } from "../../types/rounds";
import moment from "moment"
import Countdown from "react-countdown"
import ClaimButton from "./ClaimButton";

const tdClass = "py-2 text-sm text-slate-900 first:text-left text-right"

export default function Round({ index, startTime, duration, endTime, amountAllocated, amountClaimed }: IRound) {

    const countdownDuration = () => {
        const ts = endTime.toNumber()*1000
        return ts - Date.now()
    }

    return (
        <tr>
            <td className={tdClass} colSpan={1}>{ethers.utils.formatUnits(index, 0)}</td>
            <td className={tdClass} colSpan={3}>{moment(startTime.toNumber()*1000).format("MMM Do YYYY, h:mm")}</td>
            <td className={tdClass} colSpan={3}>{moment(endTime.toNumber()*1000).format("MMM Do YYYY, h:mm")}</td>
            <td className={tdClass} colSpan={3}><Countdown date={Date.now() + countdownDuration()} /></td>
            <td className={tdClass} colSpan={2}>-</td>
            <td className={tdClass} colSpan={2}>-</td>
            <td className={tdClass} colSpan={2}>-</td>
            <td className={tdClass} colSpan={2}>-</td>
            <td className={tdClass} colSpan={2}>-</td>
            <td className={tdClass} colSpan={2}>
                <ClaimButton roundIndex={index} endTime={endTime} />
            </td>
        </tr>
    )
}