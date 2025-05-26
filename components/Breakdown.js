"use client"

import {Label, Pie, PieChart} from "recharts"

import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {useFootprint} from "@/components/Providers";
import {useMemo} from "react";
import {Tab, Tabs} from "@heroui/react";
import {CalendarDays, Clock} from "lucide-react";
import {globalAverageDaily, globalAverageMonthly} from "@/lib/masterdata";

const Daily = ({categories, dailyData}) => {
    const footprint = useFootprint();

    const chartData = useMemo(() => {
        return dailyData.map((item) => ({
            category: categories[item.categoryID].description,
            footPrintAmount: item.footprintAmount,
            fill: categories[item.categoryID].colour
        }))
    }, [categories, dailyData])

    const percent = useMemo(() => {
        return (footprint / globalAverageDaily) * 100;
    }, [footprint])

    return (
        <div className="p-4 flex flex-col lg:flex-row items-center">
            <ChartContainer
                config={{}}
                className="w-full lg:w-auto lg:flex-1/2"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel/>}
                    />
                    <Pie
                        data={chartData}
                        dataKey="footPrintAmount"
                        nameKey="category"
                        animationBegin={0}
                        startAngle={180}
                        endAngle={-180}
                        innerRadius={55}
                        outerRadius={80}
                        strokeWidth={5}
                    >
                        <Label
                            content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {footprint.toLocaleString("en-US")}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-foreground/50 text-lg"
                                            >
                                                grams
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
            <div className="lg:flex-1/2 flex flex-col gap-4 items-start justify-center">
                <p> You have contributed <span className="font-bold">{footprint.toLocaleString("en-US")}</span> grams of CO<sub>2</sub> to the atmosphere today.<br/></p>
                {percent > 100 &&
                    <p> That is <span className="font-bold">{(percent - 100).toFixed(0)}</span>% <span className="text-danger">higher</span> than the global average.</p>}
                {percent > 0 && percent <= 100 &&
                    <p> That is <span className="text-primary">just</span> <span className="font-bold">{percent.toFixed(0)}</span>% of than the global average.</p>}

                {percent === 0 && <p>Input your activities to get started!</p>}
                {percent > 0 && percent <= 50 && <p>You&#39;re doing great! Keep it up!</p>}
                {percent > 50 && percent <= 100 && <p>You&#39;re doing great, but you can do better!</p>}
                {percent > 100 && percent <= 200 && <p>You should really think about cutting back!</p>}
                {percent > 200 && <p>You need to consider cutting back as soon as possible!</p>}
            </div>
        </div>
    )
}

const Monthly = ({categories, monthlyData}) => {
    const chartData = useMemo(() => {
        return monthlyData.map((item) => ({
            category: categories[item.categoryID].description,
            footPrintAmount: item.footprintAmount,
            fill: categories[item.categoryID].colour
        }))
    }, [categories, monthlyData])

    const footprint = useMemo(() => {
        return monthlyData.reduce((total, item) => total + item.footprintAmount, 0);
    }, [monthlyData]);

    const percent = useMemo(() => {
        return (footprint / globalAverageMonthly) * 100;
    }, [footprint])

    return (
        <div className="p-4 flex flex-col lg:flex-row items-center">
            <ChartContainer
                config={{}}
                className="w-full lg:w-auto lg:flex-1/2"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel/>}
                    />
                    <Pie
                        data={chartData}
                        dataKey="footPrintAmount"
                        nameKey="category"
                        animationBegin={0}
                        startAngle={180}
                        endAngle={-180}
                        innerRadius={55}
                        outerRadius={80}
                        strokeWidth={5}
                    >
                        <Label
                            content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {footprint.toLocaleString("en-US")}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-foreground/50 text-lg"
                                            >
                                                grams
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
            <div className="lg:flex-1/2 flex flex-col gap-4 items-start justify-center">
                <p> You have contributed <span className="font-bold">{footprint.toLocaleString("en-US")}</span> grams of CO<sub>2</sub> to the atmosphere this month.<br/></p>
                {percent > 100 &&
                    <p> That is <span className="font-bold">{(percent - 100).toFixed(0)}</span>% <span className="text-danger">higher</span> than the global average.</p>}
                {percent > 0 && percent <= 100 &&
                    <p> That is <span className="text-primary">just</span> <span className="font-bold">{percent.toFixed(0)}</span>% of than the global average.</p>}

                {percent === 0 && <p>Input your activities to get started!</p>}
                {percent > 0 && percent <= 50 && <p>You&#39;re doing great! Keep it up!</p>}
                {percent > 50 && percent <= 100 && <p>You&#39;re doing great, but you can do better!</p>}
                {percent > 100 && percent <= 200 && <p>You should really think about cutting back!</p>}
                {percent > 200 && <p>You need to consider cutting back as soon as possible!</p>}
            </div>
        </div>
    )
}

const Breakdown = ({categories, dailyData, monthlyData}) => {

    return (
        <div className="relative bg-background rounded-2xl">
            <Tabs aria-label="Timeframe" variant="underlined" color="default" className="">
                <Tab key="daily" title={
                    <div className="flex items-center space-x-2">
                        <Clock size={18} className=""/>
                        <span>Daily</span>
                    </div>
                } className="w-full">
                    <Daily categories={categories} dailyData={dailyData}/>
                </Tab>
                <Tab key="monthly" title={
                    <div className="flex items-center space-x-2">
                        <CalendarDays size={18} className=""/>
                        <span>Monthly</span>
                    </div>
                } className="w-full">
                    <Monthly categories={categories} monthlyData={monthlyData}/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Breakdown;