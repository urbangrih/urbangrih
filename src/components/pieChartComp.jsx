import React from "react";
import { PieChart, Pie, Label } from "recharts";

const MyPie = ({data}) => (
    <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius="80%"
        innerRadius="60%"
        isAnimationActive={false}
    />
);

function PieChartComp({ chartData }) {
    return (
        <div
            id="pie-chart-container"
            className="pie-chart-container"
        >
            <PieChart
                responsive
                className="pie-chart"
            >
                <MyPie 
                    data = {chartData.datasets}
                />
            </PieChart>
        </div>
    );
}

export default PieChartComp;
