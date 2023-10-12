import React, { useState, useEffect } from "react";
import "./charts.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import axios from "../../utils/useAxios";
import { CHARTS } from "../../utils/routes/constants";
import DailyLectures from "../../components/charts/dailyLectures";
import WeeklyLectures from "../../components/charts/weeklyLecures";
import MonthlyLectures from "../../components/charts/monthlyLectures";
import DailyAlbums from "../../components/charts/dailyAlbums";
import WeeklyAlbums from "../../components/charts/weeklyAlbums";
import MonthlyAlbums from "../../components/charts/monthlyAlbums";
import DailyRps from "../../components/charts/dailyRp";
import WeeklyRps from "../../components/charts/weeklyRps";
import MonthlyRps from "../../components/charts/monthlyRps";
import DailyPlaylists from "../../components/charts/dailyPlaylists";
import WeeklyPlaylists from "../../components/charts/weeklyPlaylists";
import MonthlyPlaylists from "../../components/charts/monthlyPlaylists";
const Charts = () => {

  return (
    <Container>
      <div className="charts_wrapper">
        <div className="charts_header_route max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Charts"} />
        </div>
        <DailyLectures/>
        <WeeklyLectures/>
        <MonthlyLectures/>
        <DailyAlbums/>
        <WeeklyAlbums/>
        <MonthlyAlbums/>
        <DailyRps/>
        <WeeklyRps/>
        <MonthlyRps/>
        <DailyPlaylists/>
        <WeeklyPlaylists/>
        <MonthlyPlaylists/>
      
      </div>
    </Container>
  );
};

export default Charts;
