// import { PureComponent } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { RatioChartProps } from "../../types/study";

// type CustomizedLabelProps = {
//   cx: number; // 円の中心X
//   cy: number; // 円の中心Y
//   midAngle: number; // 扇形の中央の角度
//   innerRadius: number; // 内側の半径
//   outerRadius: number; // 外側の半径
//   percent: number; // 割合（0〜1）
//   index?: number;
//   name: string;
// };

// const PieData = [
//   { name: "数学", rate: 6.5 },
//   { name: "物理", rate: 57.2 },
//   { name: "歴史", rate: 20.9 },
//   { name: "英語", rate: 9.6 },
//   { name: "国語", rate: 5.8 },
// ];

// const PieData = [
//   { name: "数学", rate: 50 },
//   { name: "物理", rate: 40 },
//   { name: "国語", rate: 10 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#66D9FF", "#7EE6C1", "#FFD166", "#C77DFF"];

const RADIAN = Math.PI / 180;

const customizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  // percent,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#f3f3f3ff"
      textAnchor={x > cx ? "start" : "middle"}
      dominantBaseline="central"
      fontSize={17}
      fontWeight={480}
    >
      {`${name}`}
      {/* ${(percent * 100).toFixed(0)}% */}
    </text>
  );
};

type pieDataItem = {
  name: string;
  ratio: number;
};

export default function RatioChart({ pieData }: RatioChartProps) {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <PieChart width={500} height={500}>
        <Pie
          data={pieData}
          dataKey="ratio"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={customizedLabel}
          labelLine={false}
          isAnimationActive={false}
          startAngle={90}
          endAngle={450}
        >
          {pieData.map((__, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          formatter={(value, entry) => {
            const payload = entry.payload as pieDataItem;
            const ratio = payload
              ? Math.floor(payload.ratio * 100 * 10) / 10
              : 0;

            return `${value}:${ratio}%`;
          }}
          align="center"
          // verticalAlign="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
