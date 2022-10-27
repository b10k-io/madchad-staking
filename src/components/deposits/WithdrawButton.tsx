import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { BigNumber, ethers } from "ethers"
import { useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import ERC20Staking from "../../abi/ERC20Staking.json"
import { contractAddress } from "../../constants";
import WithdrawDialog from "../dialogs/WithdrawDialog"

interface IWithdrawButton {
    depositIndex: number
}

export default function WithdrawButton({ depositIndex }: IWithdrawButton) {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: deposit } = useContractRead(contract, "deposits", depositIndex)

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        
        setIsOpen(false)
    }

    function openModal() {
        
        setIsOpen(true)
    }

    function isWithdrawn(): boolean {
        return !(deposit.withdrawlTime as BigNumber).eq(ethers.constants.MaxUint256)
    }

    function isDisabled(): boolean {
        if (!address) return true
        if (!deposit) return true
        return isWithdrawn()
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={isDisabled()}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Withdraw</span>
                </div>
            </button>
            <WithdrawDialog depositIndex={depositIndex} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}