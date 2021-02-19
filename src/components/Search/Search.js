import styles from "./Search.module.scss";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "../../assets/search.svg";
const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
  };

  const onKeyPress = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      callSearchFunction(event);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <div className={styles.card__container}>
          <div className={styles.card__icon} onClick={callSearchFunction}>
            <img src={SearchIcon} alt="search" />
          </div>
          <div className={styles.card__input}>
            <TextField
              id="outlined-basic"
              label="Search for your favourite book"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchInputChanges}
              onKeyPress={onKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
