import RotatingGradient from "@/components/RotatingGradient";
import {getMonthlyData} from "@/lib/api";
import History from "@/components/History";

const ProgressPage = async () => {
    return (
        <main className="flex flex-col w-full h-[100dvh] overflow-hidden items-center justify-center gap-8 bg-background px-6 lg:px-[25%]">
            <div className="relative w-full max-w-3xl neumorphic rounded-2xl group">
                <RotatingGradient className="absolute inset-0
                    invisible group-hover:visible group-focus-within:visible transition-transform animate-pulse
                    blur-[10px] rounded-2xl"/>
                <History
                    data={await getMonthlyData()}
                />
            </div>
        </main>
    );
}

export default ProgressPage;