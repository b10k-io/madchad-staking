import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import moment from "moment";
import { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa"
import ERC20Staking from "../../abi/ERC20Staking.json"
import { contractAddress } from "../../constants";
import ClaimDialog from "../dialogs/ClaimDialog";

interface IClaimButton {
    roundIndex: number
    endTime: BigNumber
}

export default function ClaimButton({ roundIndex, endTime }: IClaimButton) {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: amountStakedForRoundByAddress, isLoading: isLoadingAmountStakedForRoundByAddress } = useContractRead(contract, "amountStakedForRoundByAddress", roundIndex, address);
    const { data: ethUnclaimedForRoundByAddress, isLoading: isLoadingEthUnclaimedForRoundByAddress } = useContractRead(contract, "ethUnclaimedForRoundByAddress", roundIndex, address);

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function isDisabled(): boolean {
        const beforeEndTime = moment().isBefore(endTime.toNumber() * 1000)
        return beforeEndTime || 
            isLoadingAmountStakedForRoundByAddress || 
            !amountStakedForRoundByAddress || 
            (amountStakedForRoundByAddress as BigNumber).eq(0) ||
            isLoadingEthUnclaimedForRoundByAddress ||
            !ethUnclaimedForRoundByAddress ||
            (ethUnclaimedForRoundByAddress as BigNumber).eq(0)
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-emerald-500 text-emerald-500 hover:border-emerald-400 hover:text-emerald-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" disabled={isDisabled()} onClick={openModal}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Claim</span>
                </div>
            </button>
            <ClaimDialog roundIndex={roundIndex} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}