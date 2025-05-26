import { PagedResponse } from '@/lib/models/api/PagedResponse';
import { useState, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = { immediate: true }
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

interface UsePagedApiState<T> {
  data: PagedResponse<T> | null;
  loading: boolean;
  error: string | null;
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  isFirst: boolean;
  isLast: boolean;
}
  
export function usePagedApi<T>(
  apiCall: () => Promise<PagedResponse<T>>,
  options: UseApiOptions = { immediate: true }
) {
  const [state, setState] = useState<UsePagedApiState<T>>({
    data: null,
    loading: false,
    error: null,
    content: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    isFirst: true,
    isLast: true,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({
        data: result,
        loading: false,
        error: null,
        content: result.content,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        currentPage: result.number,
        isFirst: result.first,
        isLast: result.last,
      });
      return result;
    } catch (error: any) {
      let errorMessage = 'Error desconocido';
      
      if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
        errorMessage = 'Error de conexión. Verifica que el servidor esté ejecutándose';
      } else if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data?.message || error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'No se pudo conectar con el servidor';
      } else {
        errorMessage = error.message;
      }
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage,
        content: [],
        totalElements: 0,
        totalPages: 0,
        currentPage: 0,
        isFirst: true,
        isLast: true,
      }));
      
      console.error('API Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}