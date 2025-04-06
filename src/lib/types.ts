export type ErrorResponse = {
  message: string;
  details?: string;
};

export type Result<T> = { success: true; data: T } | { success: false; error: ErrorResponse };

export type PaginatedResponse<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};
