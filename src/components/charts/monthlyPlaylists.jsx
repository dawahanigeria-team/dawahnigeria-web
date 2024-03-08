import React from "react";
import GroupWidget from "../groupWidget/GroupWidget";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureApi } from "../../services";
import { CHARTS } from "../../utils/routes/constants";

export default function MonthlyPlaylists() {
  const keyParam = { action: "daily" };
  const isChart = true;

  const { querieddata } = useQueryGetRequest(
    "monthlyPlaylists",
    keyParam,
    lectureApi.getPlaylistsChart
  );

  return (
    <div className="charts_recent charts_space">
      {" "}
      <GroupWidget
        data={querieddata?.data}
        heading="Top Monthly Playlists"
        type={"playlist"}
        styling={isChart}
        navLinking={"/pl"}
        nav1={{ title: "Charts", link: CHARTS }}
      />
    </div>
  );
}
