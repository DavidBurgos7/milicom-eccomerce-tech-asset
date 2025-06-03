"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { authService } from "@/services/auth-service";
import { LoginRequestDto } from "@/lib/models/auth/dtos/LoginRequestDto";
import { userService } from "@/services/user-service";
import { useUserInfoStore } from "@/lib/store/user-store";

// Esquema de validación para el formulario de login
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida.",
  }),
});

export function LoginForm() {
  const router = useRouter();

  const { setUserInfo } = useUserInfoStore();
  
  // Inicializar React Hook Form con Zod
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const newLoginDto: LoginRequestDto = {
        email: values.email,
        password: values.password,
      }

      // * Llamar al servicio de autenticación para iniciar sesión
      const response = await authService.login(newLoginDto);
      
      const userResponse = await userService.getUserByEmail(values.email);

      setUserInfo({
        id: userResponse.id,
        firstName: userResponse.firstName || "",
        lastName: userResponse.lastName || "",
        birthDate: userResponse.birthDate || "",
        shippingAddress: userResponse.shippingAddress || "",
        phoneNumber: userResponse.phoneNumber || "",
        street: "",
        city:  "",
        state: "",
        zipCode: "",
        country: "",
        instructions: "",
      })

      toast("Inicio de sesión exitoso, redirigiendo a la página principal...");
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar el pedido. Por favor, inténtalo de nuevo más tarde.';
      toast.error(`Error al registrarse: ${errorMessage}`);    
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
                <div className="text-sm text-right">
                  <a href="/forgot-password" className="text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Iniciar sesión</Button>
          
          <div className="text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate aquí
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}