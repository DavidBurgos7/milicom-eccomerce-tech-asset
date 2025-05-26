export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string; // ISO 8601 date string (YYYY-MM-DD)
  shippingAddress: string;
}
