import { IWidgetWrapper } from "../../types/widgets";

export default function WidgetWrapper({ children }: IWidgetWrapper) {
    return (
        <div className="py-16 px-8 bg-white rounded-2xl">
            <div className="flex flex-col items-center justify-center gap-6">
                { children }
            </div>
        </div>
    )
}