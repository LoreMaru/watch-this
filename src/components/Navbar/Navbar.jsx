import { memo } from "react";
import { Icon } from "@iconify/react";
import styles from "../Navbar/index.module.scss";

const Navbar = ({
  active,
  setActive,
  setMiniBtnVisibility,
  switchContent,
  setSwitchContent,
}) => {
  const { randomBtn, searchBtn, topRatedBtn, popularBtn } = active;

  const randomBtnFn = () => {
    if (randomBtn === true) {
      setActive((prev) => ({ ...prev, randomBtn: false }));
    } else {
      setActive({
        randomBtn: true,
        searchBtn: false,
        topRatedBtn: false,
        popularBtn: false,
      });
    }
  };
  const searchBtnFn = () => {
    if (searchBtn === true) {
      setActive((prev) => ({ ...prev, searchBtn: false }));
    } else {
      setActive({
        randomBtn: false,
        searchBtn: true,
        topRatedBtn: false,
        popularBtn: false,
      });
      setMiniBtnVisibility({
        btnInfo: true,
        infoModal: true,
        btnYes: false,
        goTo: true,
        btnNO: false,
      });
    }
  };
  const topRatedBtnFn = () => {
    if (topRatedBtn === true) {
      setActive((prev) => ({ ...prev, topRatedBtn: false }));
    } else {
      setActive({
        randomBtn: false,
        searchBtn: false,
        topRatedBtn: true,
        popularBtn: false,
      });
      setMiniBtnVisibility({
        btnInfo: false,
        infoModal: false,
        btnYes: false,
        goTo: true,
        btnNO: false,
      });
    }
  };
  const popularBtnFn = () => {
    if (popularBtn === true) {
      setActive((prev) => ({ ...prev, popularBtn: false }));
    } else {
      setActive({
        randomBtn: false,
        searchBtn: false,
        topRatedBtn: false,
        popularBtn: true,
      });
    }
  };

  const switchBtnFn = () => {
    if (switchContent === "movie") {
      setSwitchContent("tv");
    } else {
      setSwitchContent("movie");
    }
  };

  return (
    <div className={styles.Navbar}>
      <button
        className={`${styles.icone} ${styles.random}`}
        onClick={randomBtnFn}
      >
        <Icon
          icon="emojione:exclamation-question-mark"
          width="50"
          height="50"
        />
      </button>

      <button
        id="search"
        className={`${styles.icone} ${styles.search}`}
        onClick={searchBtnFn}
      >
        <Icon icon="flat-color-icons:search" width="50" height="50" />
      </button>

      <button
        id="topRated"
        className={`${styles.icone} ${styles.topRated}`}
        onClick={topRatedBtnFn}
      >
        <Icon icon="emojione:glowing-star" width="50" height="50" />
      </button>

      <button
        id="popular"
        className={`${styles.icone} ${styles.popular}`}
        onClick={popularBtnFn}
      >
        <Icon icon="fluent-emoji:new-moon" width="50" height="50" />
      </button>

      <button
        id="switch"
        className={`${styles.icone} ${styles.switch}`}
        onClick={switchBtnFn}
      >
        <Icon
          className={styles.switchIcon}
          icon="icon-park:switch-button"
          width="50"
          height="50"
        />
      </button>
    </div>
  );
};

export default memo(Navbar);
