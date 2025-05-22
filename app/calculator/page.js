import RotatingGradient from "@/components/RotatingGradient";
import CalculatorInput from "@/components/CalculatorInput";
import CalculatorResults from "@/components/CalculatorResults";
import {fetchPresets} from "@/lib/api";

const Home = async () => {
    return (

        <main className="flex flex-col w-full h-screen items-center justify-center gap-8 bg-background px-6 lg:px-[25%]">
            <div className="relative w-full max-w-3xl neumorphic rounded-2xl group">
                <div className="absolute inset-0 invisible bg-primary group-hover:visible group-focus-within:visible transition-transform animate-pulse blur-[10px] rounded-2xl"/>
                <CalculatorResults/>
            </div>
            <div className="relative w-full max-w-3xl neumorphic rounded-2xl group">
                <RotatingGradient className="absolute inset-0
                    invisible group-hover:visible group-focus-within:visible transition-transform animate-pulse
                    blur-[10px] rounded-2xl"/>
                <CalculatorInput presets={await fetchPresets()}/>
            </div>
        </main>
    );
}

export default Home;