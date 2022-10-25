import useDeposits from "../../hooks/useDeposits"
import { IDeposit } from "../../types/deposits"
import Container from "../layout/Container"
import Deposit from "./Deposit"
import DepositButton from "./DepositButton"
import WithdrawAllButton from "./WithdrawAllButton"

const tdClass = "text-xs font-semibold uppercase text-slate-400 first:text-left text-right py-2 border-b"

export default function DepositList() {

    const deposits: IDeposit[] = useDeposits()

    return (
        <Container>
            <div className="p-8 bg-white rounded-2xl">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl text-slate-900 font-bold uppercase">Deposits</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-xs uppercase font-semibold text-slate-400">Balance: 1,000,000</span>
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
                            {deposits?.map((deposit, key) => <Deposit {...deposit} key={key} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}