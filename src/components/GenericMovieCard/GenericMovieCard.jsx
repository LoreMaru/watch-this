import { useState, useEffect } from "react";
import { placeholderOBJ } from "../../utils/placeholder";
import { Icon } from "@iconify/react";
import styles from "./index.module.scss";

const GenericMovieCard = ({
  cardData,
  setMainCardData,
  miniBtnVisibility,
  switchContent,
}) => {
  const { btnInfo, infoModal, btnYes, btnNO, goTo } = miniBtnVisibility;
  const [infoModalVisibility, setInfoMOdalVisibility] = useState(false);

  useEffect(() => {
    if (!cardData.poster_path) {
      setMainCardData(placeholderOBJ);
    }
  }, [cardData]);

  return (
    <div className={styles.GenericConteiner}>
      <div className={styles.GenericMovieCard}>
        {infoModalVisibility && (
          <div className={styles.infoModal}>
            <h4>Overview:</h4> <p>{cardData.overview}</p>
          </div>
        )}
        <div className={styles.MoviePoster}>
          {cardData.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w400${cardData.poster_path}`}
              alt={cardData.title}
            />
          ) : (
            <img
              src={cardData.placeholder}
              alt={cardData.title}
              style={{ width: "300px" }}
            />
          )}
        </div>

        {btnInfo && (
          <div
            className={styles.btnInfo}
            onClick={() => setInfoMOdalVisibility(!infoModalVisibility)}
          >
            <Icon
              icon="icon-park:info"
              width="25"
              height="25"
              className={styles.miniBtn}
            />
          </div>
        )}
        {btnYes && !goTo ? (
          <div className={styles.btnYes}>
            <Icon
              icon="el:ok-sign"
              width="25"
              height="25"
              className={styles.miniBtn}
            />
          </div>
        ) : (
          <a
            className={styles.btnYes}
            href={`https://www.themoviedb.org/${switchContent}/${cardData.id}/watch`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>I wanna watch this!</p>
          </a>
        )}
        {btnNO && (
          <div className={styles.btnNO}>
            <Icon
              icon="akar-icons:circle-x-fill"
              width="25"
              height="25"
              className={styles.miniBtn}
            />
          </div>
        )}
      </div>
      {!infoModal && (
        <div
          className={styles.textConteiner}
          style={{
            backgroundImage:
              "url(" +
              `https://image.tmdb.org/t/p/original${cardData.backdrop_path}` +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h4>Overview:</h4> <p>{cardData.overview}</p>
          <h4>Release Date:</h4>
          <p>{cardData.release_date}</p>
          <p>{cardData.first_air_date}</p>
          <h4>Vote Average:</h4>
          <p>{cardData.vote_average}</p>
        </div>
      )}
    </div>
  );
};

export default GenericMovieCard;
