import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { PieChart } from '@mui/x-charts/PieChart';
import { PieChart, Pie, Label } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// ChartJS.register(ArcElement, Tooltip, Legend);
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
            style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                minHeight: "100px",
                // border: "1px solid #ccc",
                // padding: "10px",
                justifyContent: "space-around",
                alignItems: "stretch",
            }}
        >
            <PieChart
                responsive
                style={{
                    height: "calc(100% - 20px)",
                    width: "30%",
                    maxHeight: "35vh",
                    flex: "1 1 100px",
                    aspectRatio: 1,
                    zIndex: 1,
                }}
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
