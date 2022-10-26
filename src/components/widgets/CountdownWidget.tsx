import { useEffect, useState } from "react";
import { formatCountdown } from "../../support/formatters";
import { ICountdownWrapper, IWidget, IWidgetWrapper } from "../../types/widgets";
import Loading from "../layout/Loading";
import WidgetWrapper from "./WidgetWrapper";

export default function CountdownWidget({ round, isLoading, subheading }: ICountdownWrapper) {

    const [countdown, setCountdown] = useState<string>("")
    const [prevCountdown, setPrevCountdown] = useState<string>("")

    useEffect(() => {
        setInterval(() => {
            const current = formatCountdown(round)
            if (current.localeCompare(countdown) !== 0) {
                setCountdown(current)
            }
        }, 1000)
    })

    return (
        <WidgetWrapper>
            <h2 className="text-4xl font-bold text-slate-900 uppercase">{ isLoading ? <Loading /> : <>{countdown}</>}</h2>
            <h3 className="text-sm font-semibold text-slate-400 uppercase">{subheading}</h3>
        </WidgetWrapper>
    )
}