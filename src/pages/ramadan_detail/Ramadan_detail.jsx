import React, { useState } from "react";
import "./ramadan_detail.scss";
import Container from "../../components/container/Container";
import { useNavigate, useParams } from "react-router-dom";
import arrow from "../../assets/svg/arrowleft.svg";
import lazy from "../../assets/png/lazyrps.jpeg";

import HeadMeta from "../../components/head-meta";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { getBackNavigationConfig } from "../../utils/navigation";
import {
  RamadamDetailsMobileTabs,
  RamadanDetailsDesktopTabs,
  RamadanYearAlbums,
} from "../../components/ramadan-details";
import { useRamadanYearAlbums } from "../../hooks/ramadan";

const RamadanDetail = () => {
  const { id: ramadanYearId } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    const { to, options } = getBackNavigationConfig("/dawahcast/ramadan");
    navigate(to, options);
  };
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
              onClick={handleBack}
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
                  onClick={handleBack}
                  aria-label="Go back"
                  className="fixed_mob_arrow"
                >
                  <img className="fixed_mob_arrow_sz" src={arrow} alt="hun" />
                </button>
              </div>
            </div>
          </div>

          {/* details for desktop  */}
          <div className="lecdet_head_wrap hidden md:flex md:flex-col md:items-center">
            <img
              id="hero"
              className="lecdet_head_img_sz mx-auto"
              src={lazy}
              alt="head"
            />
            <p className="lecdet_head_title text-foreground text-center mt-3 text-xl">
              {yearName}
            </p>
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
