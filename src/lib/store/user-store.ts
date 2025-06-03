import { z } from "zod";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

// Schema de validación
export const userInfoSchema = z.object({
    firstName: z.string().min(1, 'El nombre es requerido').optional(),
    lastName: z.string().min(1, 'El apellido es requerido').optional(),
    birthDate: z.string().optional(),
    shippingAddress: z.string().optional(),

    street: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    city: z.string().min(2, "La ciudad es requerida"),
    state: z.string().min(2, "El estado/provincia es requerido"),
    zipCode: z.string().min(3, "El código postal es requerido"),
    country: z.string().min(2, "El país es requerido"),
    phoneNumber: z.string().min(8, "Número de teléfono válido requerido"),
    instructions: z.string().optional(),
});

export type UserFormFields = z.infer<typeof userInfoSchema>;

export type UserInfoFormData = z.infer<typeof userInfoSchema> & { id: number };

export interface UserInfoStore {
    userInfo: UserInfoFormData;
    isLoading: boolean;
    error: string | null;
    setUserInfo: (data: UserInfoFormData) => void;
    clearError: () => void;
    getUserInfo: () => UserInfoFormData;
}
  
export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set, get) => ({
        userInfo: {
            id: 0,
            firstName: '',
            lastName: '',
            birthDate: '',
            shippingAddress: '',
            phoneNumber: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            instructions: '',
        },
        isLoading: false,
        error: null,
        setUserInfo: (data: UserInfoFormData) => set({ userInfo: data }),
        clearError: () => set({ error: null }),
        getUserInfo: () => get().userInfo,
    }),
    {
      name: 'user-storage',
    }
  )
);