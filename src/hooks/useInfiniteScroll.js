import { useState, useEffect } from "react";

const useInfiniteScroll = (elRef, callback) => {
  // fetching variables to set when scroll reaches bottom
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const element = elRef.current;
    // event listeners on element's scroll event
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    // if fetching is true, it means scroll at bottom is true, we call the callback function
    callback();
  }, [isFetching]);

  function handleScroll() {
    // logic to check if page scroll is at the bottom
    if (
      elRef.current.offsetHeight + elRef.current.scrollTop !==
        elRef.current.scrollHeight ||
      isFetching
    )
      return;
    // if at bottom, this is set to true
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
