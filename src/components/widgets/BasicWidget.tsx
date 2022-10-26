import { IWidget } from "../../types/widgets";
import Loading from "../layout/Loading";
import WidgetWrapper from "./WidgetWrapper";

export default function BasicWidget({ heading, subheading, isLoading }: IWidget) {
    return (
        <WidgetWrapper>
            <h2 className="text-4xl font-bold text-slate-900 uppercase">{isLoading ? <Loading /> : heading}</h2>
            <h3 className="text-sm font-semibold text-slate-400 uppercase">{subheading}</h3>
        </WidgetWrapper>
    )
}