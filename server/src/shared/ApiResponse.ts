export interface ApiResponse<T = unknown> {
  success: boolean;       
  status: string | number; 
  message: string;       
  data: T | null;
  timestamp: string;
  path: string;
}
