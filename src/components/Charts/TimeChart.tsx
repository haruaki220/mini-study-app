import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeChartProps } from "../../types/study";

export default function TimeChart({
  summaryData,
  setSelectedBar,
  selectedBar,
}: TimeChartProps) {

  const defaultColor = "#bbb8f9ff"; // デフォルトのバーの色
  const activeColor = "#8884d8"; //選択中のバーの色

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        width={500}
        height={300}
        data={summaryData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, "dataMax"]} />
        <Bar dataKey="minutes" onClick={(_data, index) => setSelectedBar(index)}> {/* クリックされたバーのindexを取得しselectedBar（選択中のバー）に指定 */}
          {summaryData.map((_data, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === selectedBar ? activeColor : defaultColor } // 選択中のバーのみ色を変更
            />
          ))}
          <LabelList fill="#000000" style={{ pointerEvents: "none" }} /> {/* labelがクリックイベントを邪魔しないようクリック判定削除 */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
