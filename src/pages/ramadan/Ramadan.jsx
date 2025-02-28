import "./ramadan.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import { RAMADAN } from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import { useRamadanYears } from "../../hooks/ramadan";

import RowSkeletonContainer from "../../components/skeletion/skeleton.container";

const Ramadan = () => {
  const { data: ramadanYears, isLoading } = useRamadanYears();

  const extractYear = (name) => {
    const match = name?.match(/\d{4}/);
    return match ? match[0] : "";
  };

  return (
    <Container>
      <HeadMeta title="Ramadan lectures on Dawah Nigeria - Home of Islamic resources" />
      <div className="landing_wrapper px-[2%]  max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]">
        <div className="pt-20 space-y-10">
          {ramadanYears?.map(({ key_id, documents, name }) => (
            <div
              key={key_id}
              className="landing_tafsir landing_space my-1 min-[615px]:my-3"
            >
              <GroupWidget
                data={documents || []}
                heading={name || "Ramadan lectures"}
                type={"album"}
                nav1={{ title: "Ramadan", link: RAMADAN }}
                moreRoute={`${RAMADAN}/year/${extractYear(name)}`}
              />
            </div>
          ))}
        </div>

        {isLoading &&
          [...new Array(4)]?.map((_, index) => (
            <div
              key={index}
              className="landing_recent landing_space my-1 min-[615px]:my-3"
            >
              <RowSkeletonContainer />
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Ramadan;
