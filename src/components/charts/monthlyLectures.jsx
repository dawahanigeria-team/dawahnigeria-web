import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function MonthlyLectures() {
  const keyParam = { action: "monthly" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "monthlyLectures",
    keyParam,
    lectureApi.getLecturesChart
  );

  return (
    <div className="charts_recent charts_space max-[615px]:pt-[4rem]">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Monthly Lectures"
        type={"lectures"}
        styling={isChart}
        navLinking={"/l"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
