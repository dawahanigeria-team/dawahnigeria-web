import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function MonthlyAlbums() {
  const keyParam = { action: "monthly" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "monthlyAlbums",
    keyParam,
    lectureApi.getAlbumsChart
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Monthly Albums"
        type={"album"}
        styling={isChart}
        navLinking={"/a"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
