interface ILoading {
    className?: string
}

export default function Loading({ className = ""}: ILoading) {
    return <div className={`h-8 w-full bg-slate-200 animate-pulse rounded-2xl ${className}`} />
}