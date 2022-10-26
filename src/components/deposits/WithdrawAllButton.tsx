import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { BigNumber } from "ethers"
import { useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import { contractAddress } from "../../constants"
import WithdrawAllDialog from "../dialogs/WithdrawAllDialog"
import ERC20Staking from "../../abi/ERC20Staking.json"

export default function WithdrawAllButton() {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: balance } = useContractRead(contract, "balanceOf", address)
    
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function isDisabled(): boolean {
        if (!address) return true
        if (!(balance instanceof BigNumber)) return true
        if (balance.lte(0)) return true
        return false
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={isDisabled()}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Withdraw All</span>
                </div>
            </button>
            <WithdrawAllDialog isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}