import React, { useState } from "react";
import "./ramadan_detail.scss";
import Container from "../../components/container/Container";
import { useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/svg/arrowleft.svg";
import lazy from "../../assets/png/lazyrps.jpeg";

import HeadMeta from "../../components/head-meta";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import {
  RamadamDetailsMobileTabs,
  RamadanDetailsDesktopTabs,
  RamadanYearAlbums,
} from "../../components/ramadan-details";
import { useRamadanYearAlbums } from "../../hooks/ramadan";

const RamadanDetail = () => {
  const { id: ramadanYearId } = useParams();
  const navigate = useNavigate();
  const [languageTab, setLanguageTab] = useState();

  const { yearName } = useRamadanYearAlbums(ramadanYearId);

  return (
    <Container>
      <HeadMeta
        title={`${
          yearName || "Ramadan"
        } on Dawah Nigeria - Home of islamic resources`}
      />

      <div className="lecdet_wrapper">
        <div className="lecdet_container">
          {/* ------------------------------Desktop------ Bread Crumbs -------------------------------------- */}

          <div className="lecdet_breadcrumb">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="lecdet_breadcrumb_first"
            >
              Back /
            </button>
            <p className="lecdet_breadcrumb_second text-foreground">
              {yearName}
            </p>
          </div>

          {/* ------------------------------Mobile------ Bread Crumbs -------------------------------------- */}
          <div className="mobile_lecdet_tab_wrap">
            <div className="rank_and_black_wrap ">
              <div className={"pb-7"}>
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  aria-label="Go back"
                  className="fixed_mob_arrow"
                >
                  <img className="fixed_mob_arrow_sz" src={arrow} alt="hun" />
                </button>
              </div>
            </div>
          </div>

          {/* details for desktop  */}
          <div className="lecdet_head_wrap">
            <div className="lecdet_head_left">
              <img
                id="hero"
                className="lecdet_head_left_img"
                src={lazy}
                alt="head"
              />
            </div>
            <div className="lecdet_head_right">
              <p className="lecdet_head_right_head text-foreground">
                {yearName}
              </p>
            </div>
          </div>

          {/* details for mobile  */}
          <div className="md:hidden">
            <div className={"space-y-2"}>
              <img
                id="hero"
                className="lecdet_head_img_sz mx-auto"
                src={IMAGE_PLACEHOLDERS.lecturer}
                alt="head"
              />
              <div className="px-3 text-foreground z-50 text-xl">
                {yearName}
              </div>
            </div>
          </div>

          <RamadamDetailsMobileTabs
            languageTab={languageTab}
            setLanguageTab={setLanguageTab}
          />

          <RamadanDetailsDesktopTabs
            languageTab={languageTab}
            setLanguageTab={setLanguageTab}
          />

          <div className="p-3 lg:p-0">
            <RamadanYearAlbums languageId={languageTab} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RamadanDetail;
