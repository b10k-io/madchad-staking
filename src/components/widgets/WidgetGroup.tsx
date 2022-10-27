import useWidgets from "../../hooks/useWidgets"
import { formatBalance, formatPercentage } from "../../support/formatters"
import Container from "../layout/Container"
import BasicWidget from "./BasicWidget"
import CountdownWidget from "./CountdownWidget"

export default function WidgetGroup() {

    const { balance, isLoadingBalance,
        totalSupply, isLoadingTotalSupply,
        depositedETH, isLoadingDepositedETH,
        currentRound, isLoadingCurrentRound } = useWidgets()

    return (
        <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8`}>
                <BasicWidget heading={formatBalance(balance)} subheading="Pooled Tokens" isLoading={isLoadingBalance} />
                <BasicWidget heading={formatPercentage(balance, totalSupply)} subheading="Of Total Supply" isLoading={isLoadingBalance || isLoadingTotalSupply} />
                <BasicWidget heading={`${formatBalance(depositedETH)} BNB`} subheading="Rewards Deposited" isLoading={isLoadingDepositedETH} />
                <CountdownWidget round={currentRound} isLoading={isLoadingCurrentRound} subheading="Next Active Claim" />
            </div>
        </Container>
    )
}