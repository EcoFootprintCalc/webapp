import {Leaf} from "lucide-react";
import {cn} from "@/lib/utils";

const Logo = ({className}) => {
    return <div className={cn("", className)}>
        <div className="hover:scale-105 hover:rotate-1 transition-transform cursor-pointer flex flex-row items-center gap-2">
            <h1 className="text-5xl bg-clip-text text-transparent bg-gradient-to-tr from-primary/90 from-75% to-85% to-secondary">
                SANY<b>i</b>
            </h1>
            <Leaf size="2rem" strokeWidth={2.5} className="text-primary/90"/>
        </div>
    </div>;
}

export default Logo;