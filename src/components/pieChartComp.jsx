import React from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    if (
        cx == null ||
        cy == null ||
        innerRadius == null ||
        outerRadius == null
    ) {
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)+ 5;
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > ncx ? "start" : "end"}
            dominantBaseline="central"
            className="pie-chart-label"
        >
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

const MyPie = ({ data }) => (
    <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius="80%"
        innerRadius="40%"
        isAnimationActive={false}
        labelLine={false}
        label={renderCustomizedLabel}
    >
        {/* {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
        ))} */}
    </Pie>
);

function PieChartComp({ chartData }) {
    return (
        <div id="pie-chart-container" className="pie-chart-container">
            <PieChart responsive className="pie-chart">
                <MyPie data={chartData.datasets} />
            </PieChart>
        </div>
    );
}

export default PieChartComp;
