import MiniCardConteiner from "../MiniCardConteiner/MiniCardConteiner";
import GenericMovieCard from "../GenericMovieCard";
import { useState, useEffect } from "react";
import { GET, GETGenres } from "../../utils/api";
import { movieGenres, tvGenres } from "../../utils/movieGenres";
import styles from "./index.module.scss";

const Form = ({
  mainCardData,
  setMainCardData,
  miniBtnVisibility,
  switchContent,
}) => {
  const [handlerRadio, setHandlerRadio] = useState([]);
  const [handlerInput, setHandlerinput] = useState([]);
  const [inputResut, setInputResult] = useState({});
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    GETGenres(`discover/${switchContent}/`, handlerRadio).then((data) =>
      setSearchList(data.results)
    );
  }, [handlerRadio, switchContent]);

  useEffect(() => {
    GET("search", switchContent, inputResut).then((data) =>
      setSearchList(data.results)
    );
  }, [inputResut, switchContent]);

  return (
    <div className={styles.FormConteiner}>
      <form className={styles.Form}>
        <span className={styles.inputConteiner}>
          <input
            type="text"
            placeholder="search by title"
            onChange={(e) => setHandlerinput(e.target.value.replace(/ /g, "+"))}
          />
          <button
            className={styles.inputBtn}
            onClick={(e) => {
              e.preventDefault();
              setInputResult("&query=" + handlerInput);
            }}
          >
            Submit
          </button>
        </span>
        <legend>serch by genre(s)</legend>
        <div className={styles.gridForm}>
          {switchContent == "movie"
            ? movieGenres.map((item, index) => {
                return (
                  <div key={index} className={styles.checkElement}>
                    <input
                      type="radio"
                      id={"genre" + index}
                      name={"genre"}
                      value={item.code}
                      onChange={(e) => setHandlerRadio(e.target.value)}
                    />
                    <label>{item.tag}</label>
                  </div>
                );
              })
            : tvGenres.map((item, index) => {
                return (
                  <div key={index} className={styles.checkElement}>
                    <input
                      type="radio"
                      id={"genre" + index}
                      name={"genre"}
                      value={item.code}
                      onChange={(e) => setHandlerRadio(e.target.value)}
                    />
                    <label>{item.tag}</label>
                  </div>
                );
              })}
        </div>
      </form>
      <div className={styles.formCards}>
        <MiniCardConteiner
          cardData={searchList}
          setMainCardData={setMainCardData}
        />
      </div>

      <GenericMovieCard
        cardData={mainCardData}
        setMainCardData={setMainCardData}
        miniBtnVisibility={miniBtnVisibility}
        switchContent={switchContent}
      />
    </div>
  );
};

export default Form;
