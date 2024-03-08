import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function WeeklyAlbums() {
  const keyParam = { action: "weekly" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "weeklyAlbums",
    keyParam,
    lectureApi.getAlbumsChart
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Weekly Albums"
        type={"album"}
        styling={isChart}
        navLinking={"/a"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
