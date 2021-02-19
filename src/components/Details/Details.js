import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiService from "../../services/apiService";
import { PLACEHOLDER_IMG } from "../../utils/constants";
import { Loader } from "../Loader";
import DetailsEndPoints from "./Details.endpoint";
import styles from "./Details.module.scss";

const Details = () => {
  const params = useParams();
  const ApiService = useApiService();
  const [details, setDetails] = useState({});
  useEffect(() => {
    /* api hit to get book details */
    const obj = {
      bibkeys: `ISBN:${params.id}`,
      jscmd: "data",
      format: "json",
    };
    ApiService.get(DetailsEndPoints.getDetails(obj)).then((jsonResponse) => {
      const obj = jsonResponse[`ISBN:${params.id}`];
      setDetails(obj);
    });
  }, []);

  return (
    <>
      {Object.keys(details).length ? (
        <div className={styles.bookCard}>
          <div className={styles.bookCard__container}>
            <img
              src={details.cover ? details.cover.large : PLACEHOLDER_IMG}
              alt="cover"
              className={styles.bookCard__image}
            />
            <div className={styles.bookCard__hero}>
              <div className={styles.bookCard__details}>
                <div className={styles.bookCard__details__title1}>
                  {details.title}
                </div>

                <div className={styles.bookCard__details__title2}>
                  {details.subtitle}
                </div>
                <span>
                  {details.number_of_pages ? details.number_of_pages : "100+"}{" "}
                  Pages
                </span>
              </div>
            </div>
          </div>
          <div className={styles.bookCard__description}>
            <span className={styles.bookCard__description__content}>
              Published by:
              {details.publishers ? details.publishers[0].name : "-"}
            </span>
            <span className={styles.bookCard__description__content}>
              Published On: {details.publish_date ? details.publish_date : "-"}
            </span>
          </div>
          <span className={styles.bookCard__by}>{details.by_statement}</span>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Details;
