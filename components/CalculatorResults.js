"use client"

import {Label, PolarRadiusAxis, RadialBar, RadialBarChart,} from "recharts"

import {ChartContainer} from "@/components/ui/chart"
import {useMemo} from "react";
import {useFootprint} from "@/components/Providers";

const maxValue = 1000;

const CalculatorResults = ({}) => {

    const footprint = useFootprint();

    const chartData = useMemo(()=>{
        return [{footprint: footprint, gap: maxValue - footprint}]
    }, [footprint])

    const color = useMemo(()=>{
        switch (true) {
            case footprint < 200:
                return "hsl(var(--heroui-primary))"
            case footprint < 500:
                return "hsl(var(--heroui-secondary))"
            case footprint < 800:
                return "hsl(var(--heroui-warning))"
            default:
                return "hsl(var(--heroui-danger))"
        }
    }, [footprint])

    return (
        <div className="relative bg-background rounded-2xl p-4 flex flex-col items-center">
            <ChartContainer
                config={{}}
                className="w-full lg:w-1/2"
            >
                <RadialBarChart
                    cx="50%" cy="90%"
                    data={chartData}
                    startAngle={180} endAngle={0}
                    innerRadius={120} outerRadius={190}
                >
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) - 40}
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {footprint.toLocaleString("en-US")}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) - 16}
                                                className="fill-foreground/50 text-lg"
                                            >
                                                grams
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </PolarRadiusAxis>
                    <RadialBar
                        dataKey="footprint" stackId="a"
                        cornerRadius={10}
                        fill={color}
                        background={<div className="fill-black/30"/>}
                        className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                        dataKey="gap" stackId="a"
                        fill="transparent" className="stroke-transparent"
                    />
                </RadialBarChart>
            </ChartContainer>
        </div>
    );
}

export default CalculatorResults;