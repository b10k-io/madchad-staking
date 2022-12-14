import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import moment from "moment"
import { contractAddress } from "../../constants";
import Loading from "../layout/Loading";
import ClaimButton from "./ClaimButton";
import ERC20Staking from "../../abi/ERC20Staking.json"
import { formatCommify, formatCountdown, formatSimplePercent } from "../../support/formatters";
import { useState, useEffect } from "react";

export const tdClass = "py-4 px-2 text-sm text-slate-900 first:text-left text-right first:pl-0 last:pr-0"

export function LoadingRow() {
    return (
        <>
            <tr className="hidden lg:table-row">
                <td className={tdClass} colSpan={1}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={3}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={3}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={3}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={2}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={2}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={3}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={2}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={2}><Loading className="h-4" /></td>
                <td className={tdClass} colSpan={2}></td>
            </tr>
            <tr className="lg:hidden border-b border-b-slate-500 text-sm">
                <td className="flex flex-col gap-2 text-">
                    <div className="flex justify-between items-center">
                        <span>Round</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Start Time</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>End Time</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Countdown</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Staked</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Rewards</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Share</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Claimed</span>
                        <span><Loading className="h-4" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Unclaimed</span>
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
                <>
                    <tr className="hidden lg:table-row">
                        <td className={tdClass} colSpan={1}>{index}</td>
                        <td className={tdClass} colSpan={3}>{moment(round.startTime.toNumber() * 1000).format("MMM Do YYYY, HH:mm")}</td>
                        <td className={tdClass} colSpan={3}>{moment(round.endTime.toNumber() * 1000).format("MMM Do YYYY, HH:mm")}</td>
                        <td className={tdClass} colSpan={3}>{countdown}</td>
                        <td className={tdClass} colSpan={3}>
                            <div className="flex justify-end items-center gap-1">
                                <div>{isLoadingAmountStakedForRoundByAddress ? <Loading className="h-2 w-6" /> : formatCommify(amountStakedForRoundByAddress)}</div>
                                <div>/</div>
                                <div>{isLoadingAmountStakedForRound ? <Loading className="h-2 w-6" /> : formatCommify(amountStakedForRound)}</div>
                            </div>
                        </td>
                        <td className={tdClass} colSpan={2}>{formatCommify(round.amountAllocated)} BNB</td>
                        <td className={tdClass} colSpan={3}>
                            <div className="flex justify-end items-center gap-1">
                                {isLoadingEthAllocForRoundByAddress || !ethAllocForRoundByAddress ? <Loading className="w-6 h-2" /> : <div>{formatCommify(ethAllocForRoundByAddress)} BNB</div>}
                                {isLoadingWeightedAverageForRoundByAddress || !weightedAverageForRoundByAddress ? <Loading className="w-6 h-2" /> : <div>({formatSimplePercent(weightedAverageForRoundByAddress)})</div>}
                            </div>
                        </td>
                        <td className={tdClass} colSpan={2}>
                            <div className="flex justify-end">
                                {isLoadingEthClaimedForRoundByAddress || !ethClaimedForRoundByAddress ? <Loading className="w-6 h-2" /> : <>{formatCommify(ethClaimedForRoundByAddress)} BNB</>}
                            </div>
                        </td>
                        <td className={tdClass} colSpan={2}>
                            <div className="flex justify-end">
                                {isLoadingEthUnclaimedForRoundByAddress || !ethUnclaimedForRoundByAddress ? <Loading className="w-6 h-2" /> : <>{formatCommify(ethUnclaimedForRoundByAddress)} BNB</>}
                            </div>
                        </td>
                        <td className={tdClass} colSpan={2}>
                            <ClaimButton roundIndex={index} endTime={round.endTime} />
                        </td>
                    </tr>
                    <tr className="lg:hidden border-b border-b-slate-500 text-sm">
                        <td className="flex flex-col gap-2 py-2">
                            <div className="flex justify-between items-center">
                                <span>Round</span>
                                <span>{index}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Start Time</span>
                                <span>{moment(round.startTime.toNumber() * 1000).format("MMM Do YYYY, HH:mm")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>End Time</span>
                                <span>{moment(round.endTime.toNumber() * 1000).format("MMM Do YYYY, HH:mm")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Countdown</span>
                                <span>{countdown}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Staked</span>
                                <div className="flex justify-end items-center gap-1">
                                    <div>{isLoadingAmountStakedForRoundByAddress ? <Loading className="h-2 w-6" /> : formatCommify(amountStakedForRoundByAddress)}</div>
                                    <div>/</div>
                                    <div>{isLoadingAmountStakedForRound ? <Loading className="h-2 w-6" /> : formatCommify(amountStakedForRound)}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Rewards</span>
                                <span>{formatCommify(round.amountAllocated)} BNB</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Share</span>
                                <div className="flex justify-end items-center gap-1">
                                    {isLoadingEthAllocForRoundByAddress || !ethAllocForRoundByAddress ? <Loading className="w-6 h-2" /> : <div>{formatCommify(ethAllocForRoundByAddress)} BNB</div>}
                                    {isLoadingWeightedAverageForRoundByAddress || !weightedAverageForRoundByAddress ? <Loading className="w-6 h-2" /> : <div>({formatSimplePercent(weightedAverageForRoundByAddress)})</div>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Claimed</span>
                                <div className="flex justify-end">
                                    {isLoadingEthClaimedForRoundByAddress || !ethClaimedForRoundByAddress ? <Loading className="w-6 h-2" /> : <>{formatCommify(ethClaimedForRoundByAddress)} BNB</>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Unclaimed</span>
                                <div className="flex justify-end">
                                    {isLoadingEthUnclaimedForRoundByAddress || !ethUnclaimedForRoundByAddress ? <Loading className="w-6 h-2" /> : <>{formatCommify(ethUnclaimedForRoundByAddress)} BNB</>}
                                </div>
                            </div>
                            <div className="flex justify-end items-center">
                                <ClaimButton roundIndex={index} endTime={round.endTime} />
                            </div>
                        </td>
                    </tr>
                </>
                : <LoadingRow />}
        </>
    )
}