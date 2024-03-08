import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function DailyRps() {
  const keyParam = { action: "monthly" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "dailyRps",
    keyParam,
    lectureApi.getRpsChart
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Daily Lecturers"
        type={"lecturer"}
        styling={isChart}
        navLinking={"/rp"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
