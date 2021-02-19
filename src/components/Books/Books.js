import styles from "./Books.module.scss";
import { useReducer, useRef, useState } from "react";
import { Search } from "../Search";
import { Book } from "../Book";
import { Loader } from "../Loader";
import { useHistory } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Snackbar } from "@material-ui/core";
import useApiService from "../../services/apiService";
import BooksEndPoints from "./Books.endpoint";

const initialState = {
  loading: false,
  books: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_BOOK_REQUEST":
      return {
        ...state,
        loading: action.payload,
        errorMessage: null,
      };
    case "SEARCH_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        books: [...state.books, ...action.payload],
      };
    case "SEARCH_BOOK_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        loading: false,
        books: [],
      };
    default:
      return state;
  }
};

function Books() {
  /* using use reducer to combine 3 states into one */
  const [state, dispatch] = useReducer(reducer, initialState);
  const ApiService = useApiService();
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const booksEl = useRef(null);
  const page = useRef(1);
  let totalPages = useRef(0);
  const searchTerm = useRef("");
  const [isFetching, setIsFetching] = useInfiniteScroll(
    booksEl,
    fetchMoreListItems
  );

  function fetchMoreListItems() {
    debugger;
    page.current += 1;
    if (page.current <= totalPages.current) {
      getBooks();
    } else {
      setIsFetching(false);
    }
  }

  const onSearch = (string) => {
    dispatch({
      type: "CLEAR_SEARCH",
    });
    searchTerm.current = string;
    getBooks();
  };

  const getBooks = () => {
    dispatch({ type: "SEARCH_BOOK_REQUEST", payload: page.current === 1 });
    const obj = {
      q: searchTerm.current,
      page: page.current
    };
    ApiService.get(BooksEndPoints.getBooks(obj)).then((jsonResponse) => {
        if (jsonResponse.docs.length) {
          dispatch({
            type: "SEARCH_BOOK_SUCCESS",
            payload: jsonResponse.docs,
          });
          totalPages.current = Math.ceil(jsonResponse.numFound / 100);
          setIsFetching(false);
        } else {
          dispatch({
            type: "SEARCH_BOOK_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const goToDetails = (book) => {
    if (book.isbn) {
      history.push(`details/${book.isbn[1]}`);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const { books, errorMessage, loading } = state;

  return (
    <div className={styles.books} ref={booksEl}>
      <Search search={onSearch} />
      <div className={styles.books__list}>
        {loading && !errorMessage ? (
          <Loader />
        ) : errorMessage ? (
          <div className={styles.books__error}>{errorMessage}</div>
        ) : (
          <div className={styles.books__container}>
            {books.map((book, index) => (
              <Book
                key={`${index}-${book.title}`}
                book={book}
                goToDetails={goToDetails}
              />
            ))}
          </div>
        )}
        {/* showing loader during pagination */}
        {isFetching && books.length ? <Loader /> : null}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Information not found, try opening another one!"
      />
    </div>
  );
}

export default Books;
