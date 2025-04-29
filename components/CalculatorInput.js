"use client"

import {Divider} from "@heroui/divider";
import {Textarea} from "@heroui/input";
import {NumberInput, Tab, Tabs} from "@heroui/react";
import {BookCheck, List, Sparkles} from "lucide-react";
import {Select, SelectItem} from "@heroui/select";
import {Button} from "@heroui/button";
import {useMediaQuery} from "react-responsive";
import {useCalculator} from "@/components/Providers";

const activities = [
    {name: "Electricity Usage", key: "electricity"},
    {name: "Gas Usage", key: "gas"},
    {name: "Water Usage", key: "water"},
    {name: "Use Public Transport", key: "transportation"},
    {name: "Buy Groceries", key: "groceries"},
    {name: "Eat at a Restaurant", key: "restaurants"},
    {name: "Buy Clothing", key: "clothing"}
];

const CalculatorInput = () => {

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
                                classNames={{trigger: "neumorphic data-[hover]:neumorphic-in data-[open]:neumorphic-in h-12"}}>
                            {
                                activities.map((activity) => (
                                    <SelectItem key={activity.key}>{activity.name}</SelectItem>
                                ))
                            }
                        </Select>
                        <NumberInput className="col-span-1" placeholder="Enter the amount" aria-label="Enter the amount"
                                     variant="flat" color="default" size="lg"
                                     classNames={{inputWrapper: "neumorphic data-[hover]:neumorphic-in data-[focus]:neumorphic-in h-12"}}
                                     minValue={0} endContent="m"/>
                        <Button color="default" startContent={<BookCheck size={20} strokeWidth={2} className="pointer-events-none"/>}
                                className="col-span-1 lg:col-span-2 h-12 text-primary font-medium neumorphic data-[pressed]:neumorphic-in"
                                onPress={()=>calculator.addFootprint(Math.round(Math.random() * 100))}>
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
                              minRows={lg ? 1 : 3} size={lg ? "md" : "lg"}
                              classNames={{inputWrapper: "shadow-none", input: "text-md"}}/>
                    <Button color="default" startContent={<BookCheck size={20} strokeWidth={2} className="pointer-events-none"/>}
                            className="w-full h-12 text-primary font-medium neumorphic data-[pressed]:neumorphic-in"
                            onPress={()=>calculator.addFootprint(Math.round(Math.random() * 100))}>
                        Record Activity
                    </Button>
                </Tab>
            </Tabs>
        </div>
    );
}

export default CalculatorInput