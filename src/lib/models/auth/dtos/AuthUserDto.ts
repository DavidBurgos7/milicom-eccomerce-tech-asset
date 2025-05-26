export interface AuthUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // ISO 8601 date string (YYYY-MM-DD)
  shippingAddress: string;
  role: string;
  isEnabled: boolean;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
}
