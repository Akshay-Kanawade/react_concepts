import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export function useBookSearch(query, pageNumber) {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, sethasMore]= useState(false);

    useEffect(() => {
        setBooks([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios({
            method:'GET',
            url:'http://openlibrary.org/search.json',
            params: {
                q: query,
                page: pageNumber
            },
            cancelToken: new axios.CancelToken((c)=>cancel = c)
        }).then((response) => {
            setBooks((prev)=>{return [...prev,...response.data.docs.map((book)=>{return book.title;})]});
            setError(false);
            setLoading(false);
            sethasMore(response.data.docs.length > 0);
        }).catch((error)=>{
            if(axios.isCancel(error)) return;
            setLoading(false);
            setError(true);
        })
      return () => {
        cancel();        
      };
    }, [query, pageNumber]);

  return {loading,error,books,hasMore};
}

