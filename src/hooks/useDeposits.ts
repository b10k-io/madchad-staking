import { BigNumber, ethers } from "ethers"
import { IDeposit } from "../types/deposits"


export default function useDeposits() {

    const rounds: IDeposit[] = [
        { index: BigNumber.from(0), delegator: "0x0000000000000000000000000000000", amount: ethers.utils.parseEther("10000"), depositTime: BigNumber.from(1666692000), withdrawlTime: ethers.constants.MaxUint256 },
        { index: BigNumber.from(1), delegator: "0x0000000000000000000000000000000", amount: ethers.utils.parseEther("10000"), depositTime: BigNumber.from(1666692000), withdrawlTime: ethers.constants.MaxUint256 },
        { index: BigNumber.from(2), delegator: "0x0000000000000000000000000000000", amount: ethers.utils.parseEther("10000"), depositTime: BigNumber.from(1666692000), withdrawlTime: ethers.constants.MaxUint256 },
        { index: BigNumber.from(3), delegator: "0x0000000000000000000000000000000", amount: ethers.utils.parseEther("10000"), depositTime: BigNumber.from(1666692000), withdrawlTime: ethers.constants.MaxUint256 },
    ]

    return rounds
}