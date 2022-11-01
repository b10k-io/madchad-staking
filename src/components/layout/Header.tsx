import { ConnectWallet } from "@thirdweb-dev/react"
import logo from "../../assets/logo.png"
import DepositButton from "../deposits/DepositButton"
import Container from "./Container"

export default function Header() {
    return (
        <Container>
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-8">
                    <img src={logo} className="h-16" alt="MadChad" />
                    <h2 className="text-xl font-bold uppercase text-slate-100 hidden sm:block">Rewards</h2>
                </div>
                <div className="flex gap-4 items-center">
                    <div>
                    <DepositButton />
                    </div>
                    <ConnectWallet />
                </div>
            </div>
        </Container>
    )
}