import { IWidget } from "../types/widgets"

export default function useWidgets() {

    const widgets: IWidget[] = [
        { heading: "13.5M", subheading: "Tokens Staked" },
        { heading: "37%", subheading: "Circulating Supply" },
        { heading: "25 BNB", subheading: "Rewards Deposited" },
        { heading: "90 Days", subheading: "Next Payout" },
    ]

    return widgets
}