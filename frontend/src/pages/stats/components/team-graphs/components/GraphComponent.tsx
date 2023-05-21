import React, { useEffect } from "react";
import styles from "./GraphComponent.module.scss";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { IGraphComponentProps } from "./IGraphComponentProps";
import { useColorMode } from "@chakra-ui/react";
import {
  getComponentColorSecondary,
  getIconColor,
  getNavbarBlueColor,
} from "../../../../../common/utils/helpers";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { NoDataComponent } from "../../../../../components/no-data-component/NoDataComponent";
import { graphColors } from "../../../../../assets/styles/graphColors";

export const GraphComponent = (props: IGraphComponentProps) => {
  const { colorMode } = useColorMode();
  const data = props.parseData();
  const [noData, setNoData] = React.useState<boolean>(true);

  useEffect(() => {
    data.map((entry) => {
      if (entry.value > 0) {
        setNoData(false);
        return
      }
    });
  }, [data]);

  const handleParseTime = (value: number) => {
    const days = Math.floor(value / 24);
    const hours = Math.floor((value % 168) % 24);

    return `${days}d ${hours}h`;
  };

  const handleTimeTooltip = (payload: Payload<any, any>) => {
    if (payload.value) {
      return handleParseTime(parseInt(payload.value));
    }
  };

  return (
    <>
      <div className={styles.title}>{props.title}</div>

      {noData ? (
        <div className={styles.noDataWrapper}>
          <NoDataComponent header={"No data found"} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={100} height={100}>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill={getNavbarBlueColor(colorMode)}
              isAnimationActive={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
              }) => {
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
                    {props.isTime ? handleParseTime(value) : value}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={graphColors[index % graphColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload, label }) => {
                if (active) {
                  if (payload) {
                    console.log(payload[0].value);
                  }
                  return (
                    <div
                      style={{
                        background: getComponentColorSecondary(colorMode),
                        border: `1px solid ${getIconColor(colorMode)}`,
                        borderRadius: "6px",
                        padding: "0.1rem 0.5rem",
                      }}
                    >
                      {props.isTime ? (
                        <p>
                          {payload &&
                            `${payload[0].name}: ${handleTimeTooltip(
                              payload[0]
                            )}`}
                        </p>
                      ) : (
                        <p>
                          {payload && `${payload[0].name}: ${payload[0].value}`}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
