import { useSearchUnitsQuery } from '@redux/services/unit';
import { useEffect, useState } from 'react';

export default function useSearchScene () {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler); 
    };
  }, [keyword]);

  const { data, isLoading } = useSearchUnitsQuery(debouncedKeyword);
  
  return {
    state :{
        data,
        keyword,
        loading: isLoading
    },
    method: {
      setKeyword
    }
  }
}