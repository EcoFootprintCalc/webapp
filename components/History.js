"use client"

import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"
import {globalAverageDaily} from "@/lib/masterdata";

const History = ({data}) => {
    console.log(data)

    return (
        <div className="relative bg-background rounded-2xl p-4 flex flex-col items-center">
            <ChartContainer
                config={{}}
                className="w-full"
            >
                <AreaChart
                    accessibilityLayer
                    data={data.list}
                >
                    <CartesianGrid vertical={false} className="opacity-30" strokeWidth={2}/>
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={12}
                        interval={"preserveStartEnd"}
                        minTickGap={12}
                        tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                            })
                        }}
                    />
                    <ChartTooltip
                        color="hsl(var(--heroui-primary))"
                        cursor={false}
                        labelFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit"
                            });
                        }}
                        content={<ChartTooltipContent indicator="line" color="hsl(var(--heroui-primary))" />}

                    />
                    <defs>
                        <linearGradient id="fillFootprint" x1="0" y1="1" x2="0" y2="0">
                            <stop
                                offset={0}
                                stopColor="hsl(var(--heroui-primary))"
                                stopOpacity={0.1}
                            />
                            <stop
                                offset={(0.75 * globalAverageDaily) / data.max}
                                stopColor="hsl(var(--heroui-warning))"
                            />
                            <stop
                                offset={1}
                                stopColor="hsl(var(--heroui-danger))"
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey="footprintAmount"
                        name="CO2"
                        type="natural"
                        fill="url(#fillFootprint)"
                        fillOpacity={0.4}
                        strokeWidth={4}
                        activeDot={{fill: "hsl(var(--heroui-primary))"}}
                        stroke="url(#fillFootprint)"
                    />
                </AreaChart>
            </ChartContainer>
            <p className="text-foreground/50 text-center text-xs lg:text-sm mt-1">
                {data.missingRatio === 1 && "Input your activities every day and check back here to see your footprint history!"}
                {data.missingRatio >= .5 && data.missingRatio < 1 && "You're missing a lot of days, don't forget to input your activities every day!"}
                {data.missingRatio >= .25 && data.missingRatio < .5 && "You're missing some days, don't forget to input your activities every day!"}
                {data.missingRatio >= .1 && data.missingRatio < .25 && "You've missed a few days, but don't let that stop you!"}
                {data.missingRatio < .1 && "You're doing great at keeping track of your footprint, keep it up!"}

            </p>
        </div>
    )
}

export default History;