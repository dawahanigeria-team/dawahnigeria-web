import React, { useEffect, useMemo, useState } from "react";
import "./videos.scss";
import Container from "../../components/container/Container";
import { categories } from "./data";
import FilterButton from "../../components/filterButton/FilterButton";
import VideoWidget from "../../components/videoWidget/VideoWidget";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/UI/loader/loader";
import { useInfiniteScrollPagination } from "../../hooks";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { VIDEOS } from "../../utils/routes/constants";

import { videoApis } from "../../services";

import HeadMeta from "../../components/head-meta";

const normalizeVideoList = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.videos)) return response.videos;
  return [];
};

const CATEGORY_ALIASES = {
  ramadan: ["ramadhan", "ramadan", "ramzan"],
  jumuah: ["jumuah", "jumua", "jumah", "jumu'ah", "jumu’ah"],
};

const normalizeToken = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const splitTokens = (value) => {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return String(value).split(/[,/|]/);
};

const filterByCategory = (videos, category, categoryId) => {
  if (!Array.isArray(videos)) return [];
  if (!category || category === "All") return videos;
  const normalized = normalizeToken(category);
  const aliasList = CATEGORY_ALIASES[normalized] || [];
  const normalizedAliases = [normalized, ...aliasList].map(normalizeToken);

  return videos.filter((value) => {
    const numericCandidates = [
      value?.cat_id,
      value?.category_id,
      value?.catid,
      value?.categoryid,
      value?.cats_id,
      value?.catsid,
    ]
      .map((val) => (val === null || val === undefined ? null : String(val)))
      .filter(Boolean);

    if (
      categoryId &&
      numericCandidates.some((candidate) => candidate === String(categoryId))
    ) {
      return true;
    }

    const candidates = [
      ...splitTokens(value?.cats),
      ...splitTokens(value?.categories),
      ...splitTokens(value?.category),
      ...splitTokens(value?.cat),
      ...splitTokens(value?.cat_name),
      ...splitTokens(value?.category_name),
      ...splitTokens(value?.cats_name),
    ]
      .map(normalizeToken)
      .filter(Boolean);

    return candidates.some((candidate) =>
      normalizedAliases.some(
        (alias) =>
          candidate === alias ||
          candidate.replace(/\s+/g, "") === alias.replace(/\s+/g, "") ||
          candidate.includes(alias)
      )
    );
  });
};

const Videos = () => {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const campaigns = useMemo(
    () => [
      {
        title: "Ramadan Focus",
        description: "Tafseer, nightly reflections, and Ramadan reminders.",
        category: "Ramadan",
        accent: "ramadan",
      },
      {
        title: "Jumuah Khutbah",
        description: "Friday wisdom, khutbah highlights, and guidance.",
        category: "Jumuah",
        accent: "jumuah",
      },
    ],
    []
  );

  const queryParam = { page };

  const { isLoading, querieddata, isLastPage, isLoadingNextPage, isFetching } =
    useQueryGetRequest("videos", queryParam, videoApis.getVideos);

  // Update this action if the backend uses a different curated listing name.
  const curatedAction = "curatedVideo";
  const { data: curatedResponse } = useQuery({
    queryKey: ["videos", "curated", curatedAction],
    queryFn: () => videoApis.getCuratedVideos({ action: curatedAction }),
    staleTime: 5 * 60 * 1000,
  });

  const curatedVideos = useMemo(
    () => normalizeVideoList(curatedResponse),
    [curatedResponse]
  );

  const categoryParam = searchParams.get("category");
  const normalizedCategory = useMemo(() => {
    if (!categoryParam) return "All";
    const match = categories.find(
      (item) => item.categories.toLowerCase() === categoryParam.toLowerCase()
    );
    return match ? match.categories : "All";
  }, [categoryParam]);

  const activeCategoryId = useMemo(() => {
    const match = categories.find((item) => item.categories === normalizedCategory);
    return match?.id || null;
  }, [normalizedCategory]);

  useEffect(() => {
    setActive(normalizedCategory);
  }, [normalizedCategory]);

  useEffect(() => {
    if (categoryParam && normalizedCategory === "All") {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("category");
      setSearchParams(nextParams, { replace: true });
    }
  }, [categoryParam, normalizedCategory, searchParams, setSearchParams]);

  const handleCategorySelect = ({ title }) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!title || title === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", title);
    }
    setSearchParams(nextParams, { replace: true });
    setActive(title);
  };

  const categoryLink = (category) =>
    `${VIDEOS}?category=${encodeURIComponent(category)}`;

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    querieddata?.length,
    page,
    setPage,
    isFetching
  );

  const sortedByViews = useMemo(() => {
    const filteredData = filterByCategory(querieddata, active, activeCategoryId);
    if (!Array.isArray(filteredData)) return [];
    const parseViews = (value) => {
      if (value === null || value === undefined) return 0;
      const raw = String(value).trim().toLowerCase();
      const base = parseFloat(raw.replace(/,/g, ""));
      if (!Number.isFinite(base)) return 0;
      if (raw.endsWith("k")) return base * 1000;
      if (raw.endsWith("m")) return base * 1000000;
      return base;
    };
    return [...filteredData].sort(
      (a, b) => parseViews(b?.views) - parseViews(a?.views)
    );
  }, [querieddata, active, activeCategoryId]);

  const curatedFiltered = useMemo(
    () => filterByCategory(curatedVideos, active, activeCategoryId),
    [curatedVideos, active, activeCategoryId]
  );

  const featuredVideos = useMemo(() => {
    const source = curatedFiltered.length > 0 ? curatedFiltered : sortedByViews;
    return source.slice(0, 2);
  }, [curatedFiltered, sortedByViews]);
  const featuredIds = useMemo(
    () => new Set(featuredVideos.map((video) => String(video?.id))),
    [featuredVideos]
  );
  const trendingVideos = useMemo(() => {
    const remaining = sortedByViews.filter(
      (video) => !featuredIds.has(String(video?.id))
    );
    return remaining.slice(0, 6);
  }, [sortedByViews, featuredIds]);
  const trendingIds = useMemo(
    () => new Set(trendingVideos.map((video) => String(video?.id))),
    [trendingVideos]
  );
  const remainingVideos = useMemo(() => {
    const filteredData = filterByCategory(querieddata, active, activeCategoryId);
    if (!Array.isArray(filteredData)) return [];
    return filteredData.filter((video) => {
      const id = String(video?.id);
      return !featuredIds.has(id) && !trendingIds.has(id);
    });
  }, [querieddata, active, featuredIds, trendingIds]);

  return (
    <Container>
      <HeadMeta title={`Videos - Get islamic resources on Dawah Nigeria`} />
      <div className="video_wrapper">
        <div className="vid_header_link bg-background max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Videos"} />
        </div>
        <div className="video_filter">
          <div className="video_filter_categories">
            {categories.map(({ categories, id }) => {
              return (
                <FilterButton
                  key={id}
                  active={active}
                  setActive={setActive}
                  title={categories}
                  action="categories"
                  data={querieddata}
                  onSelect={handleCategorySelect}
                />
              );
            })}
          </div>
        </div>
        <div className="video_intro">
          <div className="video_intro_badge">DN Video Hub</div>
          <div className="video_intro_text">
            Curated Islamic videos for the Ummah, the Nigerian way.
          </div>
        </div>
        <div className="video_campaigns">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.category}
              to={categoryLink(campaign.category)}
              className={`video_campaign video_campaign--${campaign.accent}`}
            >
              <div className="video_campaign_label">{campaign.category}</div>
              <div className="video_campaign_title">{campaign.title}</div>
              <div className="video_campaign_description">
                {campaign.description}
              </div>
            </Link>
          ))}
        </div>
        {isLoading && !isLoadingNextPage && (
          <div className="w-full flex items-center justify-center h-[300px]">
            <Loader />
          </div>
        )}
        {!isLoading && Array.isArray(querieddata) && querieddata.length === 0 && (
          <div className="video_empty">
            <div className="video_empty_title">No videos yet</div>
            <div className="video_empty_text">
              We are preparing fresh content. Please check back soon.
            </div>
          </div>
        )}
        {!isLoading &&
          Array.isArray(querieddata) &&
          querieddata.length > 0 &&
          active !== "All" &&
          sortedByViews.length === 0 && (
            <div className="video_empty">
              <div className="video_empty_title">
                No videos in “{active}”
              </div>
              <div className="video_empty_text">
                Try another category or clear the filter to see all videos.
              </div>
              <button
                type="button"
                className="video_empty_action"
                onClick={() => handleCategorySelect({ title: "All" })}
              >
                Clear filter
              </button>
            </div>
          )}

        {featuredVideos.length > 0 && (
          <section className="video_section">
            <div className="video_section_header">
              <div>
                <h2 className="video_section_title">Featured picks</h2>
                <p className="video_section_subtitle">
                  Carefully selected lectures to start with.
                </p>
              </div>
            </div>
            <div className="video_featured_grid">
              {featuredVideos.map(({ images, id, favourites, author, views, title }, idx) => (
                <Link
                  key={id || idx}
                  to={`${VIDEOS}${id}`}
                  className="video_card_link"
                  aria-label={`Watch ${title || "video"}`}
                >
                  <VideoWidget
                    title={title}
                    lecturer={author}
                    views={views}
                    img={images}
                    favourites={favourites}
                    variant="featured"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {trendingVideos.length > 0 && (
          <section className="video_section">
            <div className="video_section_header">
              <div>
                <h2 className="video_section_title">Most watched</h2>
                <p className="video_section_subtitle">
                  What the community is watching on DN.
                </p>
              </div>
            </div>
            <div className="video_trending_row">
              {trendingVideos.map(({ images, id, favourites, author, views, title }, idx) => (
                <Link
                  key={id || idx}
                  to={`${VIDEOS}${id}`}
                  className="video_card_link"
                  aria-label={`Watch ${title || "video"}`}
                >
                  <VideoWidget
                    title={title}
                    lecturer={author}
                    views={views}
                    img={images}
                    favourites={favourites}
                    variant="compact"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {remainingVideos.length > 0 && (
          <section className="video_section">
            <div className="video_section_header">
              <div>
                <h2 className="video_section_title">All videos</h2>
                <p className="video_section_subtitle">
                  Explore the full library.
                </p>
              </div>
            </div>
            <div className="video_widget">
              {remainingVideos.map(
                ({ images, id, favourites, author, views, title }, idx) => (
                  <Link
                    key={id || idx}
                    to={`${VIDEOS}${id}`}
                    className="video_card_link"
                    aria-label={`Watch ${title || "video"}`}
                  >
                    <VideoWidget
                      title={title}
                      lecturer={author}
                      views={views}
                      img={images}
                      favourites={favourites}
                    />
                  </Link>
                )
              )}
            </div>
          </section>
        )}
        {!isLastPage && (
          <div ref={infiniteScrollRef} className="video_scroll_sentinel" />
        )}
        {isLoadingNextPage && (
          <div className="w-full flex items-center h-[100px] justify-center ">
            <Loader />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Videos;
