"use client"

import {Switch} from "@heroui/switch";
import {Moon, SunDim} from "lucide-react";
import {useContext} from "react";
import {LightContext} from "@/components/Providers";

const LightToggle = () => {
    const ctx = useContext(LightContext);

    return (
        <>
            <Switch
                onValueChange={ctx.setMode} isSelected={ctx.mode}
                color='warning' startContent={<SunDim color='white'/>} endContent={<Moon color='white'/>}
                classNames={{wrapper: "bg-black/20"}}
            >
                Light Mode
            </Switch>
        </>
    )
}

export default LightToggle;