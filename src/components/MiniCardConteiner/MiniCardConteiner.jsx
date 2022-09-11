import { memo } from "react";
import { movieGenres } from "../../utils/movieGenres";
import { Icon } from "@iconify/react";
import styles from "./index.module.scss";

const MiniCardConteiner = ({ cardData = movieGenres.tag, setMainCardData }) => {
  const sendMainCardData = (data) => {
    setMainCardData(data);
  };

  return (
    <div className={styles.MiniCardConteiner}>
      <div className={styles.box}>
        {cardData?.length > 2 ? (
          cardData?.slice(0, 18).map((item, index) => (
            <div
              key={index}
              className={styles.miniCard}
              onClick={() => sendMainCardData(item)}
            >
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                  alt={item.title}
                />
              )}
            </div>
          ))
        ) : (
          <>
            <h4>Waiting patiently...</h4>
            <Icon icon="medical-icon:i-waiting-area" width="200" height="200" />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(MiniCardConteiner);
