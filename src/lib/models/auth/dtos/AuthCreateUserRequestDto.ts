export interface AuthCreateUserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // ISO 8601 date string (YYYY-MM-DD)
  shippingAddress: string;
}
