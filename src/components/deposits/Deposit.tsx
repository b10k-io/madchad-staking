import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from "moment"
import WithdrawButton from "./WithdrawButton";
import ERC20Staking from "../../abi/ERC20Staking.json"
import { contractAddress } from "../../constants";
import { formatCommify } from "../../support/formatters";
import Loading from "../layout/Loading";

const tdClass = "p-2 text-sm text-slate-900 first:text-left text-right"

interface IDeposit {
    index: number
}

export function LoadingDeposit() {
    return (
        <tr>
            <td className={tdClass} colSpan={1}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}></td>
        </tr>
    )
}

export default function Deposit({ index }: IDeposit) {

    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: deposit } = useContractRead(contract, "deposits", index)


    return (
        <>
            {deposit ?
                <tr>
                    <td className={tdClass} colSpan={1}>{index}</td>
                    <td className={tdClass} colSpan={3}>{moment(deposit.depositTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                    <td className={tdClass} colSpan={3}>{!deposit.withdrawlTime.eq(ethers.constants.MaxUint256) && moment(deposit.withdrawlTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                    <td className={tdClass} colSpan={2}>{formatCommify(deposit.amount)}</td>
                    <td className={tdClass} colSpan={2}>
                        <WithdrawButton />
                    </td>
                </tr> : <LoadingDeposit />}
        </>
    )
}