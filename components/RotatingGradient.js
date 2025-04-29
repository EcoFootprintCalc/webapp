"use client"

import {motion, useTime} from "motion/react"
import {cn} from "@/lib/utils";

const RotatingGradient = ({className}) => {
    const time = useTime();

    return (
        <motion.div
            initial={{background: `linear-gradient(0turn, hsl(var(--heroui-primary)), hsl(var(--heroui-accent))))`}}
            animate={{background: `linear-gradient(1turn, hsl(var(--heroui-primary)), hsl(var(--heroui-accent)))`}}
            transition={{type:'tween', repeat: Infinity, duration: 3, ease: "linear"}}
            className={cn("", className)}/>
    )
}

export default RotatingGradient