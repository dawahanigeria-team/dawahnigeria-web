import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { chartsApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function WeeklyRps() {
  const keyParam = { action: "weekly" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "weeklyRps",
    keyParam,
    chartsApi.getRps
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Weekly Lecturers"
        type={"lecturer"}
        styling={isChart}
        navLinking={"/rp"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
