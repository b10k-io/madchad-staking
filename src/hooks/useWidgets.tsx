import { useContract, useContractRead } from "@thirdweb-dev/react"
import { contractAddress } from "../constants"
import ERC20Staking from "../abi/ERC20Staking.json"
import ERC20 from "../abi/ERC20.json"

export default function useWidgetData() {

    const { contract, isLoading: isLoadingContract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: tokenAddress, isLoading: isLoadingTokenAddress } = useContractRead(contract, "token");
    const { contract: token, isLoading: isLoadingToken } = useContract(tokenAddress, ERC20.abi)
    const { data: balance, isLoading: isLoadingBalance } = useContractRead(token, "balanceOf", contractAddress)
    const { data: totalSupply, isLoading: isLoadingTotalSupply } = useContractRead(token, "totalSupply")
    const { data: depositedETH, isLoading: isLoadingDepositedETH } = useContractRead(contract, "depositedETH")
    const { data: currentRoundIndex, isLoading: isLoadingCurrentRoundIndex } = useContractRead(contract, "currentRoundIndex")
    const { data: currentRound, isLoading: isLoadingCurrentRound } = useContractRead(contract, "rounds", currentRoundIndex)

    return {
        contract, isLoadingContract,
        tokenAddress, isLoadingTokenAddress,
        token, isLoadingToken,
        balance, isLoadingBalance,
        totalSupply, isLoadingTotalSupply,
        depositedETH, isLoadingDepositedETH,
        currentRoundIndex, isLoadingCurrentRoundIndex,
        currentRound, isLoadingCurrentRound
    }
}