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
import { toast } from "sonner";
import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Esquema de validación para el formulario de login


export default function Login() {
  
  

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Inicia Sesion</CardTitle>
          <CardDescription>
            Introduce tus credenciales para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>
    </div>
  );
}