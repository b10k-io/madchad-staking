import { IWidget } from "../../types/widgets";

export default function Widget({ heading, subheading }: IWidget) {
    return (
        <div className="p-16 bg-white rounded-2xl">
            <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-4xl font-bold text-slate-900 uppercase">{heading}</h2>
                <h3 className="text-sm font-semibold text-slate-400 uppercase">{subheading}</h3>
            </div>
        </div>
    )
}