import { useHistory } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = ({ text }) => {
  const history = useHistory();
  const onHeaderClick = () => {
    history.push("/");
  };
  return (
    <header className={styles.header} onClick={onHeaderClick}>
      <h2>{text}</h2>
    </header>
  );
};

export default Header;
