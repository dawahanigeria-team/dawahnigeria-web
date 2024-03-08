import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function MonthlyRps() {
  const keyParam = { action: "monthly" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "monthlyRps",
    keyParam,
    lectureApi.getRpsChart
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Monthly Lecturers"
        type={"lecturer"}
        styling={isChart}
        navLinking={"/rp"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
