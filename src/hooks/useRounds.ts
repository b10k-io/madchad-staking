import { BigNumber, ethers } from "ethers"
import { IRound } from "../types/rounds"


export default function useRounds() {

    const rounds: IRound[] = [
        { index: BigNumber.from(0), startTime: BigNumber.from(1666692000), endTime: BigNumber.from(1674468000), duration: BigNumber.from(7776000), amountAllocated: ethers.utils.parseEther("25"), amountClaimed: BigNumber.from(0) },
        { index: BigNumber.from(1), startTime: BigNumber.from(1666692000), endTime: BigNumber.from(1674468000), duration: BigNumber.from(7776000), amountAllocated: ethers.utils.parseEther("25"), amountClaimed: BigNumber.from(0) },
        { index: BigNumber.from(2), startTime: BigNumber.from(1666692000), endTime: BigNumber.from(1674468000), duration: BigNumber.from(7776000), amountAllocated: ethers.utils.parseEther("25"), amountClaimed: BigNumber.from(0) },
        { index: BigNumber.from(3), startTime: BigNumber.from(1666692000), endTime: BigNumber.from(1674468000), duration: BigNumber.from(7776000), amountAllocated: ethers.utils.parseEther("25"), amountClaimed: BigNumber.from(0) },
        { index: BigNumber.from(4), startTime: BigNumber.from(1666692000), endTime: BigNumber.from(1674468000), duration: BigNumber.from(7776000), amountAllocated: ethers.utils.parseEther("25"), amountClaimed: BigNumber.from(0) },
    ]

    return rounds
}