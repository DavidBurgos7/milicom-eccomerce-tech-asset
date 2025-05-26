import { PagedResponse } from '../types/api-responses';

// Para respuestas que pueden ser paginadas o no
export type ApiResponse<T> = T | PagedResponse<T>;
