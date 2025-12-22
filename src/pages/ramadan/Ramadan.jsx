import "./ramadan.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import { RAMADAN } from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import { useRamadanYears } from "../../hooks/ramadan";
import { useNavigate } from "react-router-dom";
import RowSkeletonContainer from "../../components/skeletion/skeleton.container";

const Ramadan = () => {
  const { data: ramadanYears, isLoading } = useRamadanYears();
  const navigate = useNavigate();

  const extractYear = (name) => {
    const match = name?.match(/\d{4}/);
    return match ? match[0] : "";
  };

  const featuredYear = ramadanYears?.[0];
  const otherYears = ramadanYears?.slice(1);

  return (
    <Container>
      <HeadMeta title="Ramadan lectures on Dawah Nigeria - Home of Islamic resources" />

      <div className="ramadan-page">
        <div className="ramadan-geometric-bg" aria-hidden="true"></div>

        <div className="ramadan-container">
          <header className="ramadan-header">
            <h1 className="ramadan-title">
              <span className="ramadan-title-main">Ramadan</span>
              <span className="ramadan-title-sub">A Journey Through Sacred Teachings</span>
            </h1>
          </header>

          {!isLoading && featuredYear && (
            <section className="ramadan-hero" aria-labelledby="featured-year">
              <div className="ramadan-hero-card">
                <div className="ramadan-hero-pattern" aria-hidden="true"></div>
                <div className="ramadan-hero-content">
                  <div className="ramadan-hero-label">Latest Collection</div>
                  <h2 id="featured-year" className="ramadan-hero-year">
                    {extractYear(featuredYear.name)}
                    <span className="ramadan-hero-year-suffix">AH</span>
                  </h2>
                  <p className="ramadan-hero-name">{featuredYear.name}</p>
                  <div className="ramadan-hero-meta">
                    <span className="ramadan-hero-count">
                      {featuredYear.documents?.length || 0}
                      <span className="ramadan-hero-count-label">Lectures</span>
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`${RAMADAN}/year/${extractYear(featuredYear.name)}`)}
                    className="ramadan-hero-cta"
                    aria-label={`View all ${featuredYear.documents?.length || 0} lectures from ${featuredYear.name}`}
                  >
                    <span>View All {featuredYear.documents?.length || 0} Lectures</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                <div className="ramadan-hero-preview">
                  <div className="ramadan-hero-preview-header">
                    <h3 className="ramadan-hero-preview-title">Preview</h3>
                    <p className="ramadan-hero-preview-subtitle">
                      Showing {Math.min(6, featuredYear.documents?.length || 0)} of {featuredYear.documents?.length || 0} lectures
                    </p>
                  </div>
                  <GroupWidget
                    data={featuredYear.documents?.slice(0, 6) || []}
                    heading=""
                    type={"album"}
                    nav1={{ title: "Ramadan", link: RAMADAN }}
                    moreRoute={`${RAMADAN}/year/${extractYear(featuredYear.name)}`}
                    hideMore={true}
                  />
                </div>
              </div>
            </section>
          )}

          {!isLoading && otherYears && otherYears.length > 0 && (
            <section className="ramadan-timeline" aria-label="Previous Ramadan years">
              <h2 className="ramadan-timeline-heading">Previous Years</h2>

              <div className="ramadan-timeline-list">
                {otherYears.map(({ key_id, documents, name }, index) => {
                  const year = extractYear(name);
                  const isLast = index === otherYears.length - 1;

                  return (
                    <article key={key_id} className="ramadan-timeline-item">
                      <div className="ramadan-timeline-marker">
                        <div className="ramadan-timeline-dot"></div>
                        {!isLast && <div className="ramadan-timeline-line"></div>}
                      </div>

                      <div className="ramadan-timeline-content">
                        <div className="ramadan-timeline-header">
                          <div className="ramadan-timeline-year-badge">
                            <span className="ramadan-timeline-year">{year}</span>
                            <span className="ramadan-timeline-year-label">AH</span>
                          </div>
                          <div className="ramadan-timeline-info">
                            <h3 className="ramadan-timeline-name">{name}</h3>
                            <p className="ramadan-timeline-count">
                              {documents?.length || 0} lectures available
                            </p>
                          </div>
                        </div>

                        <div className="ramadan-timeline-widget">
                          <GroupWidget
                            data={documents || []}
                            heading=""
                            type={"album"}
                            nav1={{ title: "Ramadan", link: RAMADAN }}
                            moreRoute={`${RAMADAN}/year/${year}`}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {isLoading && (
            <div className="ramadan-loading">
              {[...new Array(4)].map((_, index) => (
                <div key={index} className="ramadan-loading-item">
                  <RowSkeletonContainer />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Ramadan;
