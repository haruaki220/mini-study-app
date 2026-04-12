import { Cell, Legend, Pie, PieChart, ResponsiveContainer, type PieLabelRenderProps } from "recharts";
import type { RatioChartProps } from "../../types/study";

// const PieData = [
//   { name: "数学", ratio: 50 },
//   { name: "物理", ratio: 40 },
//   { name: "国語", ratio: 10 },
// ];

//円グラフの色定義の配列
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#66D9FF",
  "#7EE6C1",
  "#FFD166",
  "#C77DFF",
];

type pieDataItem = {
  name: string;
  ratio: number;
};

// 扇形の中央にラベルを表示する
// rechartsの型で各値がundefinedの可能性があるため初期値を設定
const customizedLabel = ({
  cx=0, // 円の中心x
  cy=0, // 円の中心Y
  midAngle=0, // 扇形の中央の角度
  innerRadius=0, // 内側の半径
  outerRadius=0, // 外側の半径
  name="", // 教科名
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180; // 角度をラジアンに変換する定数
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // 文字表示位置までの半径を計算
  const x = cx + radius * Math.cos(-midAngle * RADIAN); // 文字表示位置のx座標を計算
  const y = cy + radius * Math.sin(-midAngle * RADIAN); // 文字表示位置のy座標を計算

  return (
    <text
      x={x}
      y={y}
      fill="#f3f3f3ff"
      textAnchor={x > cx ? "start" : "middle"} // xの座標に応じてラベルテキストの表示位置を調整
      dominantBaseline="central"
      fontSize={17}
      fontWeight={480}
    >
      {name}
      {/* ${(percent * 100).toFixed(0)}% */}
    </text>
  );
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
          {pieData.map((_data, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> //グラフ要素の色をCOLORS配列の中でループして定義
          ))}
        </Pie>
        <Legend
          //凡例の割合表示を小数第1位までに整形し見やすくする
          formatter={(value, entry) => {
            const payload = entry.payload as pieDataItem;
            const ratio = payload
              ? Math.floor(payload.ratio * 100 * 10) / 10 //小数第一位までに切り捨て
              : 0;

            return `${value}:${ratio}%`;
          }}
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
