
import { PLACEHOLDER_IMG } from "../../utils/constants";
import styles from "./Book.module.scss";
const Book = ({ book, goToDetails }) => {
  const poster =
    book.isbn && book.isbn[2]
      ? `http://covers.openlibrary.org/b/ISBN/${book.isbn[2]}-M.jpg`
      : PLACEHOLDER_IMG;

  // handle image loading fail event and setting the placeholder instead.
  const handleLoadError = (event) => {
    event.target.src =
    PLACEHOLDER_IMG;
  }
  return (
    <div className={styles.book} onClick={() => goToDetails(book)}>
      <h2 className={styles.book__heading}>{book.title}</h2>
      <div>
        <img
          width="200"
          onError={handleLoadError}
          alt={`The book titled: ${book.title}`}
          src={poster}
          loading="lazy"
        />
      </div>
      <p>{book.author_name && book.author_name[0]}</p>
    </div>
  );
};

export default Book;
