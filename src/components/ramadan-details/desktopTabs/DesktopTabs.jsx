import { useParams } from "react-router-dom";
import { useRamadanYearAlbums } from "../../../hooks/ramadan";

export const RamadanDetailsDesktopTabs = ({ languageTab, setLanguageTab }) => {
  const { id: ramadanYearId } = useParams();

  const { data: ramadanYearLectures } = useRamadanYearAlbums(ramadanYearId);

  return (
    <div className="lecdet_tab_wrap mb-5">
      <div className="lecdet_tab">
        {ramadanYearLectures?.map(({ lang_id, name, documents }, index) => (
          <button
            key={lang_id}
            onClick={() => {
              setLanguageTab(lang_id);
            }}
            className="lecdet_tab_song"
          >
            <span
              className={`${
                (
                  languageTab !== undefined
                    ? languageTab === lang_id
                    : index === 0
                )
                  ? "lecdet_tab_song1_active text-foreground"
                  : "lecdet_tab_song1"
              }`}
            >
              {name}
            </span>
            <span
              className={`${
                (
                  languageTab !== undefined
                    ? languageTab === lang_id
                    : index === 0
                )
                  ? "lecdet_tab_song2_active text-color"
                  : "lecdet_tab_song2"
              }`}
            >
              ({documents?.length})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
