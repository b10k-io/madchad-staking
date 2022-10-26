import { useEffect, useState } from "react";
import { formatCountdown } from "../../support/formatters";
import { ICountdownWrapper } from "../../types/widgets";
import Loading from "../layout/Loading";
import WidgetWrapper from "./WidgetWrapper";

export default function CountdownWidget({ round, isLoading, subheading }: ICountdownWrapper) {

    const [countdown, setCountdown] = useState<string>("")

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
            <h2 className="text-4xl font-bold text-slate-900 uppercase">{ isLoading || round === undefined ? <Loading className="w-32"/> : <>{countdown}</>}</h2>
            <h3 className="text-sm font-semibold text-slate-400 uppercase">{subheading}</h3>
        </WidgetWrapper>
    )
}