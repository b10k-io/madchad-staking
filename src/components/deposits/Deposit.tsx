import { ethers } from "ethers";
import moment from "moment"
import { IDeposit } from "../../types/deposits";
import WithdrawButton from "./WithdrawButton";

const tdClass = "py-2 text-sm text-slate-900 first:text-left text-right"

export default function Deposit({ index, amount, depositTime, withdrawlTime }: IDeposit) {
    return (
        <tr>
            <td className={tdClass} colSpan={1}>{ethers.utils.formatUnits(index, 0)}</td>
            <td className={tdClass} colSpan={3}>{moment(depositTime.toNumber()*1000).format("MMM Do YYYY, h:mm")}</td>
            <td className={tdClass} colSpan={3}>{!withdrawlTime.eq(ethers.constants.MaxUint256) && moment(withdrawlTime.toNumber()*1000).format("MMM Do YYYY, h:mm")}</td>
            <td className={tdClass} colSpan={2}>{ethers.utils.formatEther(amount)}</td>
            <td className={tdClass} colSpan={2}>
                <WithdrawButton />
            </td>
        </tr>
    )
}