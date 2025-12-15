import "./ramadanYearAlbums.scss";
import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import AlbumWidget from "../../albumWidget/AlbumWidget";
import { ALBUMS } from "../../../utils/routes/constants";
import { useFilteredRamadanYearAlbums } from "../../../hooks/ramadan";

export const RamadanYearAlbums = ({ languageId }) => {
  const { data: albums, isLoading } = useFilteredRamadanYearAlbums(languageId);

  return (
    <>
      {/* loading state  */}
      {isLoading && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}

      {/* data in grid  */}
      <div className="lecalb_wrapper">
        {albums?.map(({ img, name, id, lec_no }) => {
          return (
            <Link to={`${ALBUMS}${id}`} className="lecalb_album_item" key={id}>
              <AlbumWidget
                nid={id}
                lec_no={lec_no}
                /*categories={name?.split("-")?.[1] || name}*/
                img={img}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};
