import React from "react";
import { StatsProvider } from "../../common/providers/StatsProvider";
import { Stats } from "./Stats";

export const StatsContainer = () => {
  return (
    <StatsProvider>
      <Stats />
    </StatsProvider>
  );
};
