import { useContract, useContractRead } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import { contractAddress } from "../../constants"
import Container from "../layout/Container"
import Round, { LoadingRow } from "./Round"
import ERC20Staking from "../../abi/ERC20Staking.json"
import { BigNumber } from "ethers"
import Loading from "../layout/Loading"
import { FaSpinner, FaTimes } from "react-icons/fa"

const tdClass = "px-2 text-xs font-semibold uppercase text-slate-400 first:text-left first:pl-0 text-right py-2 border-b"

function LoadingRounds() {
    return (
        <tr>
            <td colSpan={24} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaSpinner className="animate-spin h-6 w-6" />
                    <p className="text-slate-400 text-sm font-semibold uppercase">Loading Rounds</p>
                </div>
            </td>
        </tr>
    )
}

function ZeroRounds() {
    return (
        <tr>
            <td colSpan={24} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaTimes className="h-6 w-6 text-slate-400" />
                    <p className="text-slate-400 text-sm font-semibold uppercase">No rounds have been scheduled</p>
                </div>
            </td>
        </tr>
    )
}

export default function RoundList() {

    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: nbRounds, isLoading } = useContractRead(contract, "nbRounds");

    const [indexArray, setIndexArray] = useState<number[]>([])

    useEffect(() => {
        if (nbRounds instanceof BigNumber) {
            const length = nbRounds.toNumber()
            setIndexArray(Array.from(Array(length).keys()))
        }
    }, [nbRounds])

    return (
        <Container>
            <div className="p-8 bg-white rounded-2xl">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl text-slate-900 font-bold uppercase">Rounds</h2>
                    <table className="w-full table-fixed">
                        <thead>
                            <tr>
                                <td className={tdClass} colSpan={1}>#</td>
                                <td className={tdClass} colSpan={3}>Start Time</td>
                                <td className={tdClass} colSpan={3}>End Time</td>
                                <td className={tdClass} colSpan={3}>Countdown</td>
                                <td className={tdClass} colSpan={3}>Staked</td>
                                <td className={tdClass} colSpan={2}>Rewards</td>
                                <td className={tdClass} colSpan={3}>Share</td>
                                <td className={tdClass} colSpan={2}>Claimed</td>
                                <td className={tdClass} colSpan={2}>Unclaimed</td>
                                <td className={tdClass} colSpan={2}></td>
                            </tr>
                        </thead>
                        <tbody>
                            { isLoading && <LoadingRounds />}
                            { !isLoading && indexArray?.length <= 0 && <ZeroRounds />}
                            { indexArray?.map((index, key) => <Round index={index} key={key} />) }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}