import React from "react";
import styles from "./GraphComponent.module.scss";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { IGraphComponentProps } from "./IGraphComponentProps";
import { useColorMode } from "@chakra-ui/react";
import {
  getIconColor,
  getNavbarBlueColor,
} from "../../../../../common/utils/helpers";

export const GraphComponent = (props: IGraphComponentProps) => {
  const { colorMode } = useColorMode();
  const data = props.parseData();

  return (
    <>
      <div className={styles.title}>{props.title}</div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={100} height={100}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            fill={getNavbarBlueColor(colorMode)}
            isAnimationActive={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={getIconColor(colorMode)}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  className={styles.text}
                >
                  {value}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  "#" +
                  ((Math.random() * 0xffffff) << 0)
                    .toString(16)
                    .padStart(6, "0")
                }
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
