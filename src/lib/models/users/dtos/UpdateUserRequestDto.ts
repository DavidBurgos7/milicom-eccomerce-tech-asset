// UpdateUserRequestDto

export interface UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  birthDate?: string; // ISO 8601 date string (YYYY-MM-DD)
  shippingAddress?: string;
  phoneNumber?: string;
}
