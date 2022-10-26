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
    const endTime = (round as IRound).endTime.toNumber() * 1000
    if (endTime < Date.now()) return "Ended"
    const duration = endTime - Date.now()
    let options: HumanizerOptions = { round: true }
    if (duration < 60*1000) {
        options = { ...options, units: ["s"] }
    } else if (duration < 60*60*1000) {
        options = { ...options, units: ["m"] }
    } else if (duration < 24*60*60*1000) {
        options = { ...options, units: ["h"] }
    } else {
        options = { ...options, units: ["d"] }
    }
    return humanizeDuration(duration, options)
}

export function formatStaked(num: any, den: any): string {
    if (!(num instanceof BigNumber)) return ""
    if (!(den instanceof BigNumber)) return ""
    num = formatBalance(num)
    den = formatBalance(den)
    return `${num}/${den}`
}