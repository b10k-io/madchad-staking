import { useEffect } from "react"
import useWidgets from "../../hooks/useWidgets"
import { IWidget } from "../../types/widgets"
import Container from "../layout/Container"
import Widget from "./Widget"

export default function WidgetGroup() {

    const widgets: IWidget[] = useWidgets()

    useEffect(() => {
        console.log(widgets)
    }, [widgets])

    return (
        <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8`}>
                {widgets?.map((widget, key) => <Widget {...widget} key={key} />)}
            </div>
        </Container>
    )
}