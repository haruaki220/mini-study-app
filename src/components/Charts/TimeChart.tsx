// import React, {PureComponent} from "react";
import type { StudyTimeProps } from "../../types/study";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";


export default function TimeChart({summaryData, handleBarStart, selectedBar}:StudyTimeProps) {
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
        <Legend align="center"/>
        <Bar dataKey="minutes" onClick={(__,index) => handleBarStart(index)}>
          {summaryData.map((__,index)=>(
            <Cell key={`cell-${index}`} fill={index===selectedBar?"#8884d8" : "#bbb8f9ff"}/>
          ))}
          <LabelList fill="#000000" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}