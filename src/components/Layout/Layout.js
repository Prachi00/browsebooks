import { Books } from "../Books";
import styles from "./Layout.module.scss";
import { Header } from "../Header";
import { Switch, Route } from "react-router-dom";
import { Details } from "../Details";

const Layout = () => {
  return (
		<div className={styles.container}>
			<Header text="Books Library" />
			<div className={styles.container__body}>
				<Switch>
					<Route exact path="/" component={Books} />
					<Route path="/details/:id" component={Details} />
				</Switch>
			</div>
		</div>
	);
};

export default Layout;
