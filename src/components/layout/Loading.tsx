interface ILoading {
    className?: string
}

export default function Loading({ className = ""}: ILoading) {
    return <div className={`w-full bg-slate-200 animate-pulse rounded-2xl ${className}`} />
}