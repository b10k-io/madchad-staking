import { BigNumber } from "ethers"

export interface IDeposit {
    index: BigNumber
    delegator: string
    amount: BigNumber
    depositTime: BigNumber
    withdrawlTime: BigNumber
}