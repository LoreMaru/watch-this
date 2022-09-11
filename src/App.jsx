import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import RandomMovieCard from "./components/RandomMovieCard";
import GenericMovieCard from "./components/GenericMovieCard";
import MiniCardConteiner from "./components/MiniCardConteiner/MiniCardConteiner";
import gif from "./assets/gifWatch.gif";
import styles from "./App.module.scss";
import { useState, useEffect } from "react";
import { GET } from "../src/utils/api.js";

function App() {
  const [switchContent, setSwitchContent] = useState("movie");
  const [mainCardData, setMainCardData] = useState("");
  const [miniBtnVisibility, setMiniBtnVisibility] = useState({
    btnInfo: true,
    infoModal: true,
    btnYes: false,
    goTo: true,
    btnNO: false,
  });

  const [movieLists, setMovieLists] = useState({});

  const [active, setActive] = useState({
    randomBtn: false,
    searchBtn: false,
    topRatedBtn: false,
    popularBtn: false,
    welcome: true,
  });

  const { randomBtn, searchBtn, topRatedBtn, popularBtn, welcome } = active;

  useEffect(() => {
    if (
      randomBtn == false &&
      searchBtn == false &&
      topRatedBtn == false &&
      popularBtn == false
    ) {
      setActive((prev) => ({ ...prev, welcome: true }));
    }
  }, []);

  useEffect(() => {
    GET(switchContent, "popular", "&language=en-US&page=1").then((data) =>
      setMovieLists((prev) => ({ ...prev, popular: data.results }))
    );

    GET(switchContent, "top_rated", "&language=en-US&page=1").then((data) =>
      setMovieLists((prev) => ({ ...prev, topRated: data.results }))
    );
  }, [switchContent]);

  return (
    <div className={styles.App}>
      <div className={styles.title}>
        <h2>Don't know what to watch? </h2>
        <h1>Watch This!</h1>
        {topRatedBtn == true && <h3>Top Rated</h3>}
        {popularBtn == true && <h3>Most Popular</h3>}
      </div>
      <div className={styles.mainConteiner}>
        <div className={styles.side}>
          <Navbar
            active={active}
            setActive={setActive}
            miniBtnVisibility={miniBtnVisibility}
            setMiniBtnVisibility={setMiniBtnVisibility}
            switchContent={switchContent}
            setSwitchContent={setSwitchContent}
          />
        </div>
        <div className={styles.mainSection}>
          {randomBtn && (
            <>
              <RandomMovieCard switchContent={switchContent} />
            </>
          )}
          {searchBtn == true && (
            <>
              <Form
                mainCardData={mainCardData}
                setMainCardData={setMainCardData}
                miniBtnVisibility={miniBtnVisibility}
                switchContent={switchContent}
              />
            </>
          )}
          {topRatedBtn == true && (
            <>
              <MiniCardConteiner
                cardData={movieLists.topRated}
                setMainCardData={setMainCardData}
              />
              <GenericMovieCard
                cardData={mainCardData}
                setMainCardData={setMainCardData}
                miniBtnVisibility={miniBtnVisibility}
                switchContent={switchContent}
              />
            </>
          )}
          {popularBtn == true && (
            <>
              <MiniCardConteiner
                cardData={movieLists.popular}
                setMainCardData={setMainCardData}
              />
              <GenericMovieCard
                cardData={mainCardData}
                setMainCardData={setMainCardData}
                miniBtnVisibility={miniBtnVisibility}
                switchContent={switchContent}
              />
            </>
          )}

          {randomBtn == false &&
          searchBtn == false &&
          topRatedBtn == false &&
          popularBtn == false ? (
            <img src={gif} alt="welcomeGif" className={styles.welcomeGif} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
