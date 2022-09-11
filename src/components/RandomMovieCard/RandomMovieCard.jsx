import { useState, useEffect } from "react";
import { GETRandom } from "../../utils/api";
import { Icon } from "@iconify/react";
import styles from "./index.module.scss";

const RandomMovieCard = ({ switchContent }) => {
  const [randomMovieData, setRandomMovieData] = useState({});
  const [itemCounter, setItemCounter] = useState(0);
  const [pageCounter, setPageCounter] = useState(
    Math.floor(Math.random() * (100 - 2 + 1)) + 2
  );

  useEffect(() => {
    GETRandom(`discover/${switchContent}/`, pageCounter).then((data) =>
      setRandomMovieData(data)
    );
  }, [pageCounter, switchContent]);

  const ItemCounterFN = () => {
    if (itemCounter < 19) {
      setItemCounter(itemCounter + 1);
    } else if (itemCounter == 19) {
      setItemCounter(0);
      setPageCounter(pageCounter + 1);
    }
  };
  return (
    <div className={styles.RandomConteiner}>
      <div className={styles.RandomMovieCard}>
        {/*      <div className={styles.infoModal}>
        <p>
          info sul filminfo sul filminfo sul film info sul film info sul film
          info sul film info sul film info sul film info sul film info sul film
          info sul film info sul film info sul film info sul film info sul film
          info sul filminfo sul filminfo sul film info sul film info sul film
          info sul film info sul film info sul film info sul film info sul film
          info sul film info sul film info sul film info sul film info sul film
        </p>
  </div>*/}
        <div className={styles.MoviePoster}>
          {randomMovieData.results ? (
            <img
              src={`https://image.tmdb.org/t/p/w400${randomMovieData.results[itemCounter].poster_path}`}
              alt={randomMovieData.results[itemCounter].title}
            />
          ) : (
            <p>loading...</p>
          )}
        </div>
        {/*      <div className={styles.btnInfo}>
        <Icon
          icon="icon-park:info"
          width="25"
          height="25"
          className={styles.miniBtn}
        />
</div>*/}

        {randomMovieData.results && (
          <a
            className={styles.btnYes}
            href={`https://www.themoviedb.org/${switchContent}/${randomMovieData.results[itemCounter].id}/watch`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <div className={styles.btnYes}>
              <Icon
                icon="el:ok-sign"
                width="25"
                height="25"
                className={styles.miniBtn}
              />
            </div>
          </a>
        )}
        <div className={styles.btnNO} onClick={ItemCounterFN}>
          <Icon
            icon="akar-icons:circle-x-fill"
            width="25"
            height="25"
            className={styles.miniBtn}
          />
        </div>
      </div>

      {randomMovieData.results && (
        <div
          className={styles.textConteiner}
          style={{
            backgroundImage:
              "url(" +
              `https://image.tmdb.org/t/p/original${randomMovieData.results[itemCounter].backdrop_path}` +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h4>Overview:</h4>{" "}
          <p>{randomMovieData.results[itemCounter].overview}</p>
          <h4>Release Date:</h4>
          <p>{randomMovieData.results[itemCounter].release_date}</p>
          <p>{randomMovieData.results[itemCounter].first_air_date}</p>
          <h4>Vote Average:</h4>
          <p>{randomMovieData.results[itemCounter].vote_average}</p>
        </div>
      )}
    </div>
  );
};

export default RandomMovieCard;
