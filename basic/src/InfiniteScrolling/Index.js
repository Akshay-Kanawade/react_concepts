import React, { useCallback, useRef, useState } from 'react';
import { useBookSearch } from './useBookSearch';

function InfinitScrolling() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const {loading,error,books,hasMore} =useBookSearch(query,pageNumber);
    const ref = useRef();
    const lastBookRef = useCallback((node) => {
        if(loading) return;

        if(ref.current) ref.current.disconnect();
        ref.current= new IntersectionObserver(entry=> {
            if(entry[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if(node) ref.current.observe(node);

    }, [loading, hasMore])

    const handleInput = (e) =>{
        setQuery(e.target.value);
        setPageNumber(1);
    }


  
  return (
    <div>
      <input type="text" onChange={handleInput}/>
      {
        books.map((book, index) => <div key={index} ref={books?.length === index+1  ? lastBookRef : null}>{book}</div>)
      }
      <div>
        {loading ? <div key={loading}>Loading ...</div> : error ? <div key={error}> Error ... </div> : <></>}
      </div>
    </div>
  );
}

export default InfinitScrolling;
