export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
