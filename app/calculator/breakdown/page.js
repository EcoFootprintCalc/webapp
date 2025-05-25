import RotatingGradient from "@/components/RotatingGradient";
import Breakdown from "@/components/Breakdown";
import {getCategories, getDailyBreakdown, getMonthlyBreakdown} from "@/lib/api";

const BreakdownPage = async () => {
    return (
        <main className="flex flex-col w-full h-[100dvh] overflow-hidden items-center justify-center gap-8 bg-background px-6 lg:px-[25%]">
            <div className="relative w-full max-w-3xl neumorphic rounded-2xl group">
                <RotatingGradient className="absolute inset-0
                    invisible group-hover:visible group-focus-within:visible transition-transform animate-pulse
                    blur-[10px] rounded-2xl"/>
                <Breakdown
                    categories={await getCategories()}
                    dailyData={await getDailyBreakdown()}
                    monthlyData={await getMonthlyBreakdown()}
                />
            </div>
        </main>
    );
}

export default BreakdownPage;