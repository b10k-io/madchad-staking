import { IRound } from "./rounds"

export interface IWidget {
    heading: string
    subheading: string
    isLoading: boolean
}

export interface IWidgetWrapper {
    children: JSX.Element | JSX.Element[]
}

export interface ICountdownWrapper {
    round: IRound
    isLoading: boolean
    subheading: string
}