import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLink, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import Container from "../../components/container/Container";
import HeadMeta from "../../components/head-meta";
import { useDailyLeaderboard } from "../../hooks/leaderboard";
import { HOME, RAMADAN } from "../../utils/routes/constants";
import { formatLeaderboardDuration } from "../../utils/leaderboard/display";
import { EVENTS, trackEvent } from "../../utils/posthog";
import "./leaderboard.scss";

const formatLastActivity = (isoDate) => {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const Leaderboard = () => {
  const { currentUser, token, refreshToken } = useSelector((state) => state.user);
  const currentUserId = currentUser?.id ?? currentUser?.user_id ?? null;
  const hasAuthSession = Boolean(
    currentUserId ||
    (typeof token === "string" && token.trim()) ||
    (typeof refreshToken === "string" && refreshToken.trim())
  );
  const hasTrackedOpenRef = useRef(false);
  const shareResetTimerRef = useRef(null);
  const [copyLabel, setCopyLabel] = useState("Copy link");

  const {
    data,
    day,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDailyLeaderboard({
    userId: currentUserId,
    limit: 20,
    offset: 0,
    enabled: hasAuthSession,
  });

  const leaderboardData = data?.data || {};
  const entries = Array.isArray(leaderboardData.entries)
    ? leaderboardData.entries
    : [];
  const myStats = leaderboardData.myStats || null;
  const totalParticipants = leaderboardData.totalParticipants || 0;

  const isAuthError = Boolean(
    hasAuthSession &&
    isError &&
    typeof error?.message === "string" &&
    /access token|expired token|invalid token|unauthorized/i.test(error.message)
  );
  const canUseNativeShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function";

  const sharePayload = useMemo(() => {
    const fallbackUrl = "https://dawahnigeria.com/dawahcast/ramadan/leaderboard";
    const url =
      typeof window !== "undefined" && window.location?.href
        ? window.location.href
        : fallbackUrl;
    const isRanked = Boolean(myStats?.isRanked);
    const rankCopy = isRanked
      ? `I am #${myStats?.rank} on Dawah Nigeria's Ramadan leaderboard for ${day}`
      : `I am taking part in Dawah Nigeria's Ramadan leaderboard for ${day}`;
    const durationCopy = myStats?.totalSeconds
      ? ` with ${formatLeaderboardDuration(myStats.totalSeconds)} tracked`
      : "";
    const participantsCopy = totalParticipants
      ? ` among ${totalParticipants} participants`
      : "";

    return {
      title: "Dawah Nigeria Ramadan Leaderboard",
      text: `${rankCopy}${durationCopy}${participantsCopy}.`,
      url,
    };
  }, [day, myStats, totalParticipants]);

  const trackShareEvent = (platform, status = "success", errorMessage = "") => {
    trackEvent(EVENTS.LEADERBOARD_SHARED, {
      source: "leaderboard_screen",
      platform,
      status,
      day,
      rank: myStats?.rank ?? null,
      is_ranked: Boolean(myStats?.isRanked),
      total_seconds: myStats?.totalSeconds ?? null,
      error_message: errorMessage || null,
    });
  };

  const resetCopyLabelSoon = () => {
    if (shareResetTimerRef.current) {
      window.clearTimeout(shareResetTimerRef.current);
    }

    shareResetTimerRef.current = window.setTimeout(() => {
      setCopyLabel("Copy link");
    }, 1800);
  };

  const openShareWindow = (url, platform) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
    trackShareEvent(platform);
  };

  const handleNativeShare = async () => {
    if (!canUseNativeShare) {
      return;
    }

    try {
      await navigator.share(sharePayload);
      trackShareEvent("native");
    } catch (shareError) {
      if (shareError?.name === "AbortError") {
        return;
      }

      trackShareEvent("native", "error", shareError?.message);
    }
  };

  const handleWhatsappShare = () => {
    const message = encodeURIComponent(`${sharePayload.text} ${sharePayload.url}`);
    openShareWindow(`https://wa.me/?text=${message}`, "whatsapp");
  };

  const handleTwitterShare = () => {
    const message = encodeURIComponent(`${sharePayload.text} ${sharePayload.url}`);
    openShareWindow(`https://twitter.com/intent/tweet?text=${message}`, "x");
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(sharePayload.url);
    const quote = encodeURIComponent(sharePayload.text);
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      "facebook"
    );
  };

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(sharePayload.url);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = sharePayload.url;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopyLabel("Copied");
      trackShareEvent("copy");
      resetCopyLabelSoon();
    } catch (copyError) {
      setCopyLabel("Copy failed");
      trackShareEvent("copy", "error", copyError?.message);
      resetCopyLabelSoon();
    }
  };

  useEffect(() => {
    if (hasTrackedOpenRef.current) {
      return;
    }

    trackEvent(EVENTS.LEADERBOARD_OPENED, {
      source: "leaderboard_screen",
      day,
      is_authenticated: hasAuthSession,
      has_auth_session: hasAuthSession,
    });

    hasTrackedOpenRef.current = true;
  }, [day, hasAuthSession]);

  useEffect(() => () => {
    if (shareResetTimerRef.current && typeof window !== "undefined") {
      window.clearTimeout(shareResetTimerRef.current);
    }
  }, []);

  const handleRefresh = () => {
    trackEvent(EVENTS.LEADERBOARD_REFRESHED, {
      source: "leaderboard_screen",
      day,
      is_authenticated: hasAuthSession,
      has_auth_session: hasAuthSession,
    });

    refetch();
  };

  return (
    <Container>
      <HeadMeta title="Ramadan Leaderboard" />

      <div className="leaderboard-page">
        <div className="leaderboard-shell">
          <header className="leaderboard-header">
            <div>
              <p className="leaderboard-kicker">Ramadan Challenge</p>
              <h1 className="leaderboard-title">Daily Usage Leaderboard</h1>
              <p className="leaderboard-subtitle">
                Today ({day}). Stay consistent and climb higher.
              </p>
            </div>
            <button
              type="button"
              className="leaderboard-refresh"
              onClick={handleRefresh}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          </header>

          {!hasAuthSession && (
            <section className="leaderboard-empty" aria-live="polite">
              <h2>Sign in to join the leaderboard</h2>
              <p>
                We track listening sessions only for authenticated users.
              </p>
              <div className="leaderboard-empty-actions">
                <Link to="/auth/login" className="leaderboard-login-cta">
                  Login to participate
                </Link>
                <Link to={HOME} className="leaderboard-secondary-link">
                  Back home
                </Link>
              </div>
            </section>
          )}

          {hasAuthSession && (
            <>
              {isAuthError && (
                <section className="leaderboard-empty" role="alert">
                  <h2>Your session expired</h2>
                  <p>Please sign in again to load your leaderboard.</p>
                  <div className="leaderboard-empty-actions">
                    <Link to="/auth/login" className="leaderboard-login-cta">
                      Login again
                    </Link>
                    <Link to={HOME} className="leaderboard-secondary-link">
                      Back home
                    </Link>
                  </div>
                </section>
              )}

              {!isAuthError && (
                <>
                  <section className="leaderboard-my-stats" aria-label="My leaderboard stats">
                    <article className="leaderboard-stat-card">
                      <span className="leaderboard-stat-label">My Rank</span>
                      <strong className="leaderboard-stat-value">
                        {myStats?.isRanked ? `#${myStats.rank}` : "Unranked"}
                      </strong>
                    </article>
                    <article className="leaderboard-stat-card">
                      <span className="leaderboard-stat-label">My Total</span>
                      <strong className="leaderboard-stat-value">
                        {formatLeaderboardDuration(myStats?.totalSeconds)}
                      </strong>
                    </article>
                    <article className="leaderboard-stat-card">
                      <span className="leaderboard-stat-label">Sessions</span>
                      <strong className="leaderboard-stat-value">
                        {myStats?.sessionsCount || 0}
                      </strong>
                    </article>
                  </section>

                  <section className="leaderboard-share" aria-label="Share leaderboard">
                    <div className="leaderboard-share-copy">
                      <h2>Share your progress</h2>
                      <p>Invite friends to join today's Ramadan challenge.</p>
                    </div>
                    <div className="leaderboard-share-actions">
                      {canUseNativeShare && (
                        <button
                          type="button"
                          className="leaderboard-share-button leaderboard-share-button-native"
                          onClick={handleNativeShare}
                          aria-label="Share leaderboard"
                        >
                          <FaShareAlt aria-hidden="true" />
                          <span>Share</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="leaderboard-share-button"
                        onClick={handleWhatsappShare}
                        aria-label="Share leaderboard on WhatsApp"
                      >
                        <FaWhatsapp aria-hidden="true" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        className="leaderboard-share-button"
                        onClick={handleTwitterShare}
                        aria-label="Share leaderboard on X"
                      >
                        <BsTwitterX aria-hidden="true" />
                        <span>X</span>
                      </button>
                      <button
                        type="button"
                        className="leaderboard-share-button"
                        onClick={handleFacebookShare}
                        aria-label="Share leaderboard on Facebook"
                      >
                        <FaFacebookF aria-hidden="true" />
                        <span>Facebook</span>
                      </button>
                      <button
                        type="button"
                        className="leaderboard-share-button"
                        onClick={handleCopyLink}
                        aria-label="Copy leaderboard link"
                      >
                        <FaLink aria-hidden="true" />
                        <span>{copyLabel}</span>
                      </button>
                    </div>
                  </section>

                  <section className="leaderboard-table" aria-label="Leaderboard ranking list">
                    <div className="leaderboard-table-head">
                      <p>{totalParticipants} participants</p>
                      <Link to={RAMADAN} className="leaderboard-secondary-link">
                        Ramadan page
                      </Link>
                    </div>

                    {isLoading && (
                      <div className="leaderboard-loading" aria-hidden="true">
                        {Array.from({ length: 8 }).map((_, index) => (
                          <div key={index} className="leaderboard-loading-row" />
                        ))}
                      </div>
                    )}

                    {!isLoading && isError && !isAuthError && (
                      <div className="leaderboard-error" role="alert">
                        {error?.message || "Unable to load leaderboard"}
                      </div>
                    )}

                    {!isLoading && !isError && entries.length === 0 && (
                      <div className="leaderboard-empty-list" aria-live="polite">
                        No leaderboard entries yet for this day.
                      </div>
                    )}

                    {!isLoading && !isError && entries.length > 0 && (
                      <ul className="leaderboard-list">
                        {entries.map((entry) => {
                          const rank = entry?.rank || "-";
                          const username = entry?.username || `User ${entry?.userId || ""}`;
                          const rowClass = entry?.isCurrentUser
                            ? "leaderboard-row leaderboard-row-current"
                            : "leaderboard-row";

                          return (
                            <li key={`${entry?.userId}-${rank}`} className={rowClass}>
                              <div className="leaderboard-rank">#{rank}</div>
                              <div className="leaderboard-user-meta">
                                <p className="leaderboard-username">{username}</p>
                                <p className="leaderboard-session-meta">
                                  {entry?.sessionsCount || 0} sessions
                                  {entry?.lastActivityAt
                                    ? ` · Last active ${formatLastActivity(entry.lastActivityAt)}`
                                    : ""}
                                </p>
                              </div>
                              <div className="leaderboard-duration">
                                {formatLeaderboardDuration(entry?.totalSeconds)}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </section>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Leaderboard;
