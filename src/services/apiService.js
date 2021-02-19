import axios from "axios";

const useApiService = () => {
  return {
    async get(obj) {
      let response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + obj.url,
        {
          params: {
            ...obj.data,
          },
        }
      );
      return response.data;
    },
  };
};

export default useApiService;
