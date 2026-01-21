import { useState } from 'react';

export function useLoader() {
  const [isLoading, setIsLoading] = useState(false);

  const withLoader = async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      return await asyncFn();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, setIsLoading, withLoader };
}
