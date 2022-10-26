import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import moment from "moment"
import { contractAddress } from "../../constants";
import Loading from "../layout/Loading";
import ClaimButton from "./ClaimButton";
import ERC20Staking from "../../abi/ERC20Staking.json"
import { formatBalance, formatCountdown, formatSimplePercent } from "../../support/formatters";
import { useState, useEffect } from "react";

export const tdClass = "p-2 text-sm text-slate-900 first:text-left text-right"

export function LoadingRow() {
    return (
        <tr>
            <td className={tdClass} colSpan={1}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={3}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}><Loading className="h-2 my-3" /></td>
            <td className={tdClass} colSpan={2}></td>
        </tr>
    )
}

interface IRound {
    index: number
}

export default function Round({ index }: IRound) {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: round, isLoading: isLoadingRound } = useContractRead(contract, "rounds", index);
    const { data: amountStakedForRoundByAddress, isLoading: isLoadingAmountStakedForRoundByAddress } = useContractRead(contract, "amountStakedForRoundByAddress", index, address);
    const { data: amountStakedForRound, isLoading: isLoadingAmountStakedForRound } = useContractRead(contract, "amountStakedForRound", index);
    const { data: ethAllocForRoundByAddress, isLoading: isLoadingEthAllocForRoundByAddress } = useContractRead(contract, "ethAllocForRoundByAddress", index, address);
    const { data: ethClaimedForRoundByAddress, isLoading: isLoadingEthClaimedForRoundByAddress } = useContractRead(contract, "ethClaimedForRoundByAddress", index, address);
    const { data: ethUnclaimedForRoundByAddress, isLoading: isLoadingEthUnclaimedForRoundByAddress } = useContractRead(contract, "ethUnclaimedForRoundByAddress", index, address);
    const { data: weightedAverageForRoundByAddress, isLoading: isLoadingWeightedAverageForRoundByAddress } = useContractRead(contract, "weightedAverageForRoundByAddress", index, address);

    const [countdown, setCountdown] = useState<string>("")

    useEffect(() => {
        setInterval(() => {
            const current = formatCountdown(round)
            if (current.localeCompare(countdown) !== 0) {
                setCountdown(current)
            }
        }, 1000)
    })

    return (
        <>
            {!isLoadingRound && round ?
                <tr>
                    <td className={tdClass} colSpan={1}>{index}</td>
                    <td className={tdClass} colSpan={3}>{moment(round.startTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                    <td className={tdClass} colSpan={3}>{moment(round.endTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                    <td className={tdClass} colSpan={3}>{countdown}</td>
                    <td className={tdClass} colSpan={2}>
                        <div className="flex gap-2 justify-end items-center">
                            <div>{isLoadingAmountStakedForRoundByAddress ? <Loading className="h-2 w-6" /> : formatBalance(amountStakedForRoundByAddress)}</div>
                            <div>/</div>
                            <div>{isLoadingAmountStakedForRound ? <Loading className="h-2 w-6" /> : formatBalance(amountStakedForRound)}</div>
                        </div>
                    </td>
                    <td className={tdClass} colSpan={2}>{formatBalance(round.amountAllocated)} BNB</td>
                    <td className={tdClass} colSpan={3}>
                        <div className="flex justify-end items-center gap-2">
                            {isLoadingEthAllocForRoundByAddress || !ethAllocForRoundByAddress ? <Loading className="w-6 h-2" /> : <div>{formatBalance(ethAllocForRoundByAddress)} BNB</div>}
                            {isLoadingWeightedAverageForRoundByAddress || !weightedAverageForRoundByAddress ? <Loading className="w-6 h-2" /> : <div>({formatSimplePercent(weightedAverageForRoundByAddress)})</div>}
                        </div>
                    </td>
                    <td className={tdClass} colSpan={2}>
                        <div className="flex justify-end">
                            {isLoadingEthClaimedForRoundByAddress || !ethClaimedForRoundByAddress ? <Loading className="w-6 h-2" /> : <>{formatBalance(ethClaimedForRoundByAddress)} BNB</>}
                        </div>
                    </td>
                    <td className={tdClass} colSpan={2}>
                        <div className="flex justify-end">
                            {isLoadingEthUnclaimedForRoundByAddress || !ethUnclaimedForRoundByAddress ? <Loading className="w-6 h-2" /> : <>{formatBalance(ethUnclaimedForRoundByAddress)} BNB</>}
                        </div>
                    </td>
                    <td className={tdClass} colSpan={2}>
                        <ClaimButton roundIndex={index} endTime={round.endTime} />
                    </td>
                </tr>
                : <LoadingRow />}
        </>
    )
}