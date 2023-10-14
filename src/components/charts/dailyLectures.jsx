import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { chartsApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function DailyLectures() {
  const keyParam = { action: "daily" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "dailyLectures",
    keyParam,
    chartsApi.getLectures
  );

  return (
    <div className="charts_recent charts_space max-[615px]:pt-[4rem]">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Daily Lectures"
        type={"lectures"}
        styling={isChart}
        navLinking={"/l"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
