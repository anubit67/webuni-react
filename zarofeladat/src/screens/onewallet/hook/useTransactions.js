import { useCallback, useEffect, useState } from 'react';
import { AXIOS_METHOD, doApiCall } from '../../../hooks/useApi';

export default function useTransactions(walletId, limit = 5) {
  const [transactions, setTransactions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cursor, setCursor] = useState('');
  const [hasMore, setHasMore] = useState(false);

  const ApiCallBack = useCallback((newCursor) => {
    setLoading(true);
    doApiCall(AXIOS_METHOD.POST, '/transactions', (newData) => {
      setTransactions((oldTransactions) => (newCursor === '' || !oldTransactions
        ? newData?.transactions
        : [...oldTransactions, ...newData?.transactions || '']));
      setCursor(newData?.cursor);
      setHasMore(newData?.has_more);
      setError(false);
      setLoading(false);
    }, (errorMsg) => {
      setError(errorMsg);
      setCursor(false);
      setLoading(false);
    }, {
      wallet_id: walletId,
      limit,
      cursor: newCursor,
    });
  }, [setTransactions, setError, setLoading, setHasMore, walletId, limit]);

  const resetTransactionList = useCallback(() => {
    ApiCallBack('');
  }, [ApiCallBack]);

  useEffect(() => {
    ApiCallBack('');
  }, [ApiCallBack]);

  useEffect(() => {
    resetTransactionList();
  }, [resetTransactionList]);

  const onLoadMore = useCallback(() => ApiCallBack(cursor), [ApiCallBack, cursor]);

  return [transactions, loading, error, onLoadMore, hasMore, resetTransactionList];
}
