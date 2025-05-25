"use client"

import {Divider} from "@heroui/divider";
import {Textarea} from "@heroui/input";
import {addToast, NumberInput, Tab, Tabs} from "@heroui/react";
import {BookCheck, List, Sparkles} from "lucide-react";
import {Select, SelectItem} from "@heroui/select";
import {Button} from "@heroui/button";
import {useMediaQuery} from "react-responsive";
import {useCalculator} from "@/components/Providers";
import {useState} from "react";
import parseUnit from "@/lib/parseUnit";
import {postCustom, postPreset} from "@/lib/api";

const CalculatorInput = ({presets} = []) => {
    const [preset, setPreset] = useState({unit : ''});
    const [value, setValue] = useState(0);
    const [prompt, setPrompt] = useState('');

    const lg = useMediaQuery({query: "(min-width: 1024px)"});
    const calculator = useCalculator();

    return (
        <div className="relative w-full bg-background rounded-2xl p-2 flex flex-col items-center lg:items-start">
            <Tabs aria-label="Input method" variant="underlined" color="default" className="">
                <Tab key="list" title={
                    <div className="flex items-center space-x-2">
                        <List size={18} className="text-primary"/>
                        <span>Activity Presets</span>
                    </div>
                } className="w-full">
                    <Divider className="bg-gradient-to-r from-transparent to-transparent via-foreground/50 group-hover:via-primary/50 group-focus-within:via-primary/50"/>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <Select placeholder="Choose an activity" size="lg" variant="flat" className="col-span-1"
                                aria-label="Choose an activity"
                                onSelectionChange={v => setPreset(presets.find(p => p.id === parseInt(v.currentKey)))}
                                classNames={{trigger: "neumorphic data-[hover]:neumorphic-in data-[open]:neumorphic-in h-12"}}>
                            {
                                presets.map((preset) => (
                                    <SelectItem key={preset.id}>{preset.description}</SelectItem>
                                ))
                            }
                        </Select>
                        <NumberInput className="col-span-1" placeholder="Enter the amount" aria-label="Enter the amount"
                                     variant="flat" color="default" size="lg"
                                     value={value} onValueChange={setValue}
                                     classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}
                                     minValue={0} endContent={parseUnit(preset.unit)}/>
                        <Button color="default" startContent={<BookCheck size={20} strokeWidth={2} className="pointer-events-none"/>}
                                className="col-span-1 lg:col-span-2 h-12 text-primary font-medium neumorphic data-[pressed]:neumorphic-in"
                                onPress={async () => {
                                    if (!preset.id) return;
                                    const data = await postPreset(preset.id, value);
                                    calculator.setFootprint(data.sum);
                                    addToast({
                                        title: "Activity Recorded",
                                        description: `${data.footprint} grams of CO2 was added to your daily footprint`,
                                        color: "default", timeout: 2000, shouldShowTimeoutProgress: true
                                    })
                                }}>
                            Record Activity
                        </Button>
                    </div>
                </Tab>
                <Tab key="ai" title={
                    <div className="flex items-center space-x-2">
                        <Sparkles size={18} className="text-accent"/>
                        <span>Custom Activity</span>
                    </div>
                } className="w-full">
                    <Divider className="bg-gradient-to-r from-transparent to-transparent via-foreground/50 group-hover:via-accent/50 group-focus-within:via-accent/50"/>
                    <Textarea aria-label="Enter an activity" placeholder="Enter an activity"
                              className="my-6 lg:my-4 rounded-2xl neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in p-1"
                              minRows={lg ? 1 : 3} size={lg ? "md" : "lg"} classNames={{inputWrapper: "shadow-none", input: "text-md"}}
                              value={prompt} onValueChange={setPrompt}/>
                    <Button color="default" startContent={<BookCheck size={20} strokeWidth={2} className="pointer-events-none"/>}
                            className="w-full h-12 text-primary font-medium neumorphic data-[pressed]:neumorphic-in"
                            onPress={async () => {
                                if (!prompt) return;
                                const data = await postCustom(prompt);
                                calculator.setFootprint(data.sum);
                                addToast({
                                    title: "Activity Recorded",
                                    description: `${data.footprint} kg of CO2 was added to your daily footprint`,
                                    color: "default", timeout: 2000, shouldShowTimeoutProgress: true
                                })
                            }}>
                        Record Activity
                    </Button>
                </Tab>
            </Tabs>
        </div>
    );
}

export default CalculatorInput