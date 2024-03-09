import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { chartsApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function DailyAlbums() {
  const keyParam = { action: "daily" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "dailyAlbums",
    keyParam,
    chartsApi.getAlbums
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Daily Albums"
        type={"album"}
        styling={isChart}
        navLinking={"/a"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
