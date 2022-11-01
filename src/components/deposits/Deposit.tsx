import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from "moment"
import WithdrawButton from "./WithdrawButton";
import ERC20Staking from "../../abi/ERC20Staking.json"
import { contractAddress } from "../../constants";
import { formatCommify } from "../../support/formatters";
import Loading from "../layout/Loading";

const tdClass = "px-2 py-4 text-sm text-slate-900 text-right first:text-left first:pl-0 last:pr-0"

interface IDeposit {
    index: number
}

export function LoadingDeposit() {
    return (
        <>
            <tr className="hidden lg:table-row">
                <td className={tdClass} colSpan={1}><Loading className="h-2 my-3" /></td>
                <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
                <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
                <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
                <td className={tdClass} colSpan={2}></td>
            </tr>
            <tr className="lg:hidden border-b border-b-slate-500 text-sm">
                <td className="flex flex-col gap-2 text-">
                    <div className="flex justify-between items-center">
                        <span>Deposit</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Deposit Time</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Withdrawl Time</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Amount</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span></span>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default function Deposit({ index }: IDeposit) {

    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: deposit } = useContractRead(contract, "deposits", index)

    return (
        <>
            {deposit ?
                <>
                    <tr className="hidden lg:table-row">
                        <td className={tdClass} colSpan={1}>{index}</td>
                        <td className={tdClass} colSpan={3}>{moment(deposit.depositTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                        <td className={tdClass} colSpan={3}>{!deposit.withdrawlTime.eq(ethers.constants.MaxUint256) && moment(deposit.withdrawlTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                        <td className={tdClass} colSpan={2}>{formatCommify(deposit.amount)}</td>
                        <td className={tdClass} colSpan={2}>
                            <WithdrawButton depositIndex={index} />
                        </td>
                    </tr>
                    <tr className="lg:hidden border-b border-b-slate-500 text-sm">
                        <td className="py-2 flex flex-col gap-2 text-">
                            <div className="flex justify-between items-center">
                                <span>Deposit</span>
                                <span>{index}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Deposit Time</span>
                                <span>{moment(deposit.depositTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Withdrawl Time</span>
                                <span>{!deposit.withdrawlTime.eq(ethers.constants.MaxUint256) && moment(deposit.withdrawlTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Amount</span>
                                <span>{formatCommify(deposit.amount)}</span>
                            </div>
                            <div className="flex justify-end items-center">
                                <WithdrawButton depositIndex={index} />
                            </div>
                        </td>
                    </tr>
                </>
                : <LoadingDeposit />}
        </>
    )
}