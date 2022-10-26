import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import Container from "../layout/Container"
import Deposit, { LoadingDeposit } from "./Deposit"
import DepositButton from "./DepositButton"
import WithdrawAllButton from "./WithdrawAllButton"
import ERC20Staking from "../../abi/ERC20Staking.json"
import ERC20 from "../../abi/ERC20.json"
import { BigNumber } from "ethers"
import { contractAddress } from "../../constants"
import { formatCommify } from "../../support/formatters"

const tdClass = "text-xs font-semibold uppercase text-slate-400 first:text-left text-right py-2 border-b"

export default function DepositList() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: tokenAddress } = useContractRead(contract, "token");
    const { contract: token } = useContract(tokenAddress, ERC20.abi)
    const { data: depositIndexesByAddress } = useContractRead(contract, "depositIndexesByAddress", address);
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
                            {depositIndexesByAddress?.map((index: BigNumber, key: number) => <Deposit index={index.toNumber()} key={key} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}