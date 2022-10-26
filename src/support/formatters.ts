import { BigNumber, ethers } from "ethers";
import humanizeDuration, { HumanizerOptions } from "humanize-duration";
import { IRound } from "../types/rounds";

export function formatBalance(balance: any): string {
    if (!(balance instanceof BigNumber)) return ""
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(parseInt(ethers.utils.formatEther(balance)));
}

export function formatPercentage(num: any, den: any): string {
    if (!(num instanceof BigNumber)) return ""
    if (!(den instanceof BigNumber)) return ""

    const percent = num.div(den)
    return Intl.NumberFormat('en-US', {
        style: "percent",
        maximumFractionDigits: 2
    }).format(parseInt(ethers.utils.formatEther(percent))); 
}

export function formatCountdown(round: any): string {
    if (round === undefined) return ""
    const duration = (round as IRound).endTime.toNumber() * 1000 - Date.now()
    // console.log(duration)
    let options: HumanizerOptions = { round: true }
    if (duration > 60*60*24*1000) {
        options = { ...options, units: ["d"] }
    } else if (duration > 60*60*1000) {
        options = { ...options, units: ["h"] }
    } else if (duration > 60*1000) {
        options = { ...options, units: ["m"] }
    } else {
        options = { ...options, units: ["s"] }
    }
    return humanizeDuration(duration, options)
}