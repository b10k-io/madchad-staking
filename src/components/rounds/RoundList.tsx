import useRounds from "../../hooks/useRounds"
import { IRound } from "../../types/rounds"
import Container from "../layout/Container"
import Round from "./Round"

const tdClass = "text-xs font-semibold uppercase text-slate-400 first:text-left text-right py-2 border-b"

export default function RoundList() {

    const rounds: IRound[] = useRounds()

    return (
        <Container>
            <div className="p-8 bg-white rounded-2xl">
                <div className="flex flex-col gap-4">
                <h2 className="text-xl text-slate-900 font-bold uppercase">Rounds</h2>
                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <td className={tdClass} colSpan={1}>#</td>
                            <td className={tdClass} colSpan={3}>Start Time</td>
                            <td className={tdClass} colSpan={3}>End Time</td>
                            <td className={tdClass} colSpan={3}>Duration</td>
                            <td className={tdClass} colSpan={2}>Staked</td>
                            <td className={tdClass} colSpan={2}>Total</td>
                            <td className={tdClass} colSpan={2}>Share</td>
                            <td className={tdClass} colSpan={2}>Claimed</td>
                            <td className={tdClass} colSpan={2}>Unclaimed</td>
                            <td className={tdClass} colSpan={2}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {rounds?.map((round, key) => <Round {...round} key={key} />)}
                    </tbody>
                </table>
                </div>
            </div>
        </Container>
    )
}