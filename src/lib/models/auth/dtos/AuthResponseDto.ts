export interface AuthResponseDto {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  type: string; // Default: "Bearer"
}

// Default values for AuthResponseDto
export const defaultAuthResponse: Pick<AuthResponseDto, 'type'> = {
  type: 'Bearer'
};
