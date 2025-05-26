// ========== USER SERVICE DTOs ==========
// CreateUserRequestDto

export interface CreateUserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // ISO 8601 date string (YYYY-MM-DD)
  shippingAddress: string;
  phoneNumber?: string;
  password: string;
}
