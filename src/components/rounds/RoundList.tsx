import { useContract, useContractRead } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import { contractAddress } from "../../constants"
import Container from "../layout/Container"
import Round, { LoadingRow } from "./Round"
import ERC20Staking from "../../abi/ERC20Staking.json"
import { BigNumber } from "ethers"

const tdClass = "px-2 text-xs font-semibold uppercase text-slate-400 first:text-left text-right py-2 border-b"

export default function RoundList() {

    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: nbRounds, isLoading: isLoadingNbRounds } = useContractRead(contract, "nbRounds");

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
                                <td className={tdClass} colSpan={2}>Staked</td>
                                <td className={tdClass} colSpan={2}>Rewards</td>
                                <td className={tdClass} colSpan={2}>Share</td>
                                <td className={tdClass} colSpan={2}>Claimed</td>
                                <td className={tdClass} colSpan={2}>Unclaimed</td>
                                <td className={tdClass} colSpan={2}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {indexArray.length > 0 ? indexArray?.map((index, key) => <Round index={index} key={key} />) : <LoadingRow />}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}