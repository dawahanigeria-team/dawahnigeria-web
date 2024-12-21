import { useParams } from "react-router-dom";
import { useRamadanYearAlbums } from "../../../hooks/ramadan";

export const RamadamDetailsMobileTabs = ({ languageTab, setLanguageTab }) => {
  const { id: ramadanYearId } = useParams();

  const { data: ramadanYearLectures } = useRamadanYearAlbums(ramadanYearId);

  return (
    <div className="mobile_lecdet_tab flex md:hidden overflow-x-auto p-3 gap-x-3 text-color">
      {ramadanYearLectures?.map(({ lang_id, name, documents }, index) => (
        <div
          key={lang_id}
          onClick={() => {
            setLanguageTab(lang_id);
          }}
          className="mobile_lecdet_tab_song"
        >
          <span
            className={`${
              (
                languageTab !== undefined
                  ? languageTab === lang_id
                  : index === 0
              )
                ? "mobile_lecdet_tab_song1_active text-foreground"
                : "mobile_lecdet_tab_song1"
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
                ? "mobile_lecdet_tab_song2_active text-color text-sm"
                : "mobile_lecdet_tab_song2 text-color text-sm"
            }`}
          >
            ({documents?.length})
          </span>
        </div>
      ))}
    </div>
  );
};
