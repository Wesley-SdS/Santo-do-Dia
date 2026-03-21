export interface SaintCardData {
  id: string;
  name: string;
  slug: string;
  feastMonth: number;
  feastDay: number;
  category: string;
  biographyShort: string;
  imageUrl: string | null;
  country: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}
