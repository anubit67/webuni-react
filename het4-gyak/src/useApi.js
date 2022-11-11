import { useEffect, useState } from "react";
import axios from 'axios';

function useApi(endpoint) {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(false);
  const BASE_URL = 'https://food.webuni.workers.dev'

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();

    axios.get(`${BASE_URL}${endpoint}`, {
      signal: controller.signal
    }).then(({data}) => {
      setResponseData(data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      if(axios.isCancel(err)) {
        return;
      }
      setResponseData(false);
      console.log(err);
    });

    return () => {
      controller.abort();
    }
  }, [endpoint]);

  return [responseData, loading];
}

export default useApi;