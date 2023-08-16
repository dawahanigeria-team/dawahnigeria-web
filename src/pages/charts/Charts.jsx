import React, { useState, useEffect } from "react";
import "./charts.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import axios from "../../utils/useAxios";
import { lecturers } from "../lecturers/data";

const Charts = () => {
  const [dailylectures, setdailyLectures] = useState([])
  const [weeklylectures, setweeklyLectures] = useState([])
  const [monthlylectures, setmonthlyLectures] = useState([])
  const [dailyAlbum, setdailyAlbum] = useState([])
  const [weeklyAlbum, setweeklyAlbum] = useState([])
  const [monthlyAlbum, setmonthlyAlbum] = useState([])
  const [dailylecturer, setdailyLecturer] = useState([])
  const [weeklylecturer, setweeklyLecturer] = useState([])
  const [monthlylecturer, setmonthlyLecturer] = useState([])
  const [dailyPlaylist, setdailyPlaylist] = useState([])
  const [weeklyPlaylist, setweeklyPlaylist] = useState([])
  const [monthlyPlaylist, setmonthlyPlaylist] = useState([])
  const isChart = true
  useEffect(() => {

    //daily lectures https://www.dawahbox.com/mongo/api/leclisting_charts_api.php?action=weekly
    axios
      .get("/leclisting_charts_api.php?action=daily")
      .then((res) => {
        console.log('daily lectures',res.data);
        const {data} = res.data
        setdailyLectures(data);
      })
      .catch((err) => {
        console.log(err);
      });
      //weekly lectures
      axios.get("/leclisting_charts_api.php?action=weekly")
      .then((res) => {
        console.log(res.data)
        const {data} = res.data
        setweeklyLectures(data);
      })
      .catch((err) => {
        console.log(err)
      })
       //monthly lectures
       axios.get("/leclisting_charts_api.php?action=monthly")
       .then((res) => {
         console.log(res.data)
         const {data} = res.data
         setmonthlyLectures(data);
       })
       .catch((err) => {
         console.log(err)
       })
      //monthly  https://www.dawahbox.com/mongo/api/albumlisting_charts_api.php?action=daily
     
      // daily album
      axios.get("/albumlisting_charts_api.php?action=daily")
      .then((res) => {
        console.log(res.data)
        const {data} = res.data
        setdailyAlbum(data)
      })
      .catch((err) => {
        console.log(err)
      })

        // weekly album
        axios.get("/albumlisting_charts_api.php?action=weekly")
        .then((res) => {
          const {data} = res.data
          setweeklyAlbum(data)
        })
        .catch((err) => {
          console.log(err)
        })

          //monthly album
      axios.get("/albumlisting_charts_api.php?action=monthly")
      .then((res) => {
        const {data} = res.data
        setmonthlyAlbum(data)
      })
      .catch((err) => {
        console.log(err)
      })
      // https://www.dawahbox.com/mongo/api/rplisting_charts_api.php?action=daily
      
      //daily lecturers
      axios.get("/rplisting_charts_api.php?action=daily")
      .then((res) => {
        const {data} = res.data
        setdailyLecturer(data)
      })
      .catch((err) => {
        console.log(err)
      })
        
      //weekly lecturers
      axios.get("/rplisting_charts_api.php?action=weekly")
      .then((res) => {
        const {data} = res.data
        setweeklyLecturer(data)
      })
      .catch((err) => {
        console.log(err)
      })
        
      //monthly lecturers
      axios.get("/rplisting_charts_api.php?action=monthly")
      .then((res) => {
        const {data} = res.data
        setmonthlyLecturer(data)
      })
      .catch((err) => {
        console.log(err)
      })
   
      //weekly album  https://www.dawahbox.com/mongo/api/playlist_charts_api.php?action=daily
   
   // https://www.dawahbox.com/mongo/api/albumlisting_charts_api.php?action=daily

      //daily plalist
      axios.get("/playlist_charts_api.php?action=daily")
      .then((res) => {
        console.log(res.data)
        const {data} = res.data
        setdailyPlaylist(data)
      })
      .catch((err) => {
        console.log(err)
      })
        
      //weekly playlist
      axios.get("/playlist_charts_api.php?action=weekly")
      .then((res) => {
        const {data} = res.data
        setweeklyPlaylist(data)
      })
      .catch((err) => {
        console.log(err)
      })
        
      //monthly playlist
      axios.get("/playlist_charts_api.php?action=monthly")
      .then((res) => {
        const {data} = res.data
        setmonthlyPlaylist(data)
      })
      .catch((err) => {
        console.log(err)
      })



;
  }, []);
  return (
    <Container>
      <div className="charts_wrapper">
        <div className="charts_header_route max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Charts"} />
        </div>

        <div className="charts_recent charts_space max-[615px]:pt-[3rem]">
          {" "}
          <GroupWidget
            data={dailylectures}
            heading="Top Daily Lectures"
            type={"lectures"}
            styling={isChart}
            navLinking={"/l"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>
        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={weeklylectures}
            heading="Top Weekly Lectures"
            type={"lectures"}
            styling={isChart}
            navLinking={"/l"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>

        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={monthlylectures}
            heading="Top Monthly Lectures"
            type={"lectures"}
            styling={isChart}
            navLinking={"/l"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>

        
        
        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={dailyAlbum}
            heading="Top Daily Albums"
            type={"album"}
            styling={isChart}
            navLinking={"/a"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>
        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={weeklyAlbum}
            heading="Top Weekly Albums"
            type={"album"}
            styling={isChart}
            navLinking={"/a"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>
        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={monthlyAlbum}
            heading="Top Monthly Albums"
            type={"album"}
            styling={isChart}
            navLinking={"/a"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>

        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={dailylecturer}
            heading="Top Daily Lecturers"
            type={"lecturer"}
            styling={isChart}
            navLinking={"/rp"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>
        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={weeklylecturer}
            heading="Top Weekly Lecturers"
            type={"lecturer"}
            styling={isChart}
            navLinking={"/rp"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>

        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={monthlylecturer}
            heading="Top Monthly Lecturers"
            type={"lecturer"}
            styling={isChart}
            navLinking={"/l"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>


        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={dailyPlaylist}
            heading="Top Daily Playlists"
            type={"playlist"}
            styling={isChart}
            currentPage={''}
            endpoint_url={'/playlist_charts_api.php?action=daily'}
            navLinking={"/pl"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>
        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={weeklyPlaylist}
            heading="Top Weekly Playlists"
            type={"playlist"}
            currentPage={''}
            endpoint_url={'/playlist_charts_api.php?action=weekly'}
            styling={isChart}
            navLinking={"/pl"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>

        <div className="charts_recent charts_space">
          {" "}
          <GroupWidget
            data={monthlyPlaylist}
            heading="Top Monthly Playlists"
            type={"playlist"}
            styling={isChart}
            currentPage={''}
            endpoint_url={'/playlist_charts_api.php?action=monthly'}
            navLinking={"/pl"}
            nav1={{ title: "Charts", link: "/charts" }}
          />
        </div>

       
    
  
       
      </div>
    </Container>
  );
};

export default Charts;
