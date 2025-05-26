import {Spinner} from "@heroui/spinner";

const Loading = () => {
    return (
        <main className="flex flex-col w-full h-[100dvh] overflow-hidden items-center justify-center gap-8 bg-background px-6 lg:px-[25%]">
            <div className="relative w-1/2 lg:w-1/3 max-w-3xl neumorphic rounded-2xl group">
                <div className="absolute inset-0 invisible bg-primary group-hover:visible group-focus-within:visible transition-transform animate-pulse blur-[10px] rounded-2xl"/>
                <div className="relative bg-background rounded-2xl p-4 flex flex-col items-center justify-center gap-4">
                    <Spinner size="lg" color="primary" className="scale-150 my-4"/>
                    <h2 className="text-lg text-foreground/80 font-bold">Loading...</h2>
                </div>
            </div>
        </main>
    )
}

export default Loading;