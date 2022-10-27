import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import Container from "../layout/Container"
import Deposit from "./Deposit"
import DepositButton from "./DepositButton"
import WithdrawAllButton from "./WithdrawAllButton"
import ERC20Staking from "../../abi/ERC20Staking.json"
import ERC20 from "../../abi/ERC20.json"
import { BigNumber } from "ethers"
import { contractAddress } from "../../constants"
import { formatCommify } from "../../support/formatters"
import { FaPlug, FaSpinner, FaTimes } from "react-icons/fa"

const tdClass = "text-xs font-semibold uppercase text-slate-400 first:text-left first:pl-0 text-right p-2 border-b"

function LoadingDeposits() {
    return (
        <tr>
            <td colSpan={11} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaSpinner className="animate-spin h-6 w-6" />
                    <p className="text-slate-400 text-sm font-semibold uppercase">Loading Deposits</p>
                </div>
            </td>
        </tr>
    )
}

function ZeroDeposits() {

    const address = useAddress()

    return (
        <tr>
            <td colSpan={11} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaTimes className="h-6 w-6 text-slate-400" />
                    <div className="text-slate-400 text-sm font-semibold uppercase flex flex-col items-center gap-2">
                        <p>No deposits for address</p>
                        <p>{address}</p>
                    </div>
                </div>
            </td>
        </tr>
    )
}

function NoAddress() {
    return (
        <tr>
            <td colSpan={11} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaPlug className="h-6 w-6 text-slate-400" />
                    <div className="text-slate-400 text-sm font-semibold uppercase flex flex-col items-center gap-2">
                        <p>Connect your wallet to view deposits</p>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default function DepositList() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: tokenAddress } = useContractRead(contract, "token");
    const { contract: token } = useContract(tokenAddress, ERC20.abi)
    const { data: depositIndexesByAddress, isLoading } = useContractRead(contract, "depositIndexesByAddress", address);
    const { data: deposited } = useContractRead(contract, "balanceOf", address);
    const { data: balanceOf } = useContractRead(token, "balanceOf", address);

    return (
        <Container>
            <div className="p-8 bg-white rounded-2xl">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl text-slate-900 font-bold uppercase">Deposits</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex divide-x divide-solid">
                                <span className="px-2 text-xs uppercase font-semibold text-slate-400">Balance: {formatCommify(balanceOf)}</span>
                                <span className="px-2 text-xs uppercase font-semibold text-slate-400">Deposited: {formatCommify(deposited)}</span>
                            </div>
                            <DepositButton />
                            <WithdrawAllButton />
                        </div>
                    </div>
                    <table className="w-full table-fixed">
                        <thead>
                            <tr>
                                <td className={tdClass} colSpan={1}>#</td>
                                <td className={tdClass} colSpan={3}>Deposit Time</td>
                                <td className={tdClass} colSpan={3}>Withdrawl Time</td>
                                <td className={tdClass} colSpan={2}>Amount</td>
                                <td className={tdClass} colSpan={2}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {!address && <NoAddress />}
                            {address && isLoading && <LoadingDeposits />}
                            {!isLoading && depositIndexesByAddress?.length <= 0 && <ZeroDeposits />}
                            {!isLoading && depositIndexesByAddress?.map((index: BigNumber, key: number) => <Deposit index={index.toNumber()} key={key} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}