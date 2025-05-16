import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Registro | Milicom's SportStore",
  description: "Crea una cuenta en SportStore para comprar artículos deportivos online",
};

export default function RegisterPage() {
  return (
    <div className="container flex h-screen items-center justify-center py-12">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Side - Form */}
        <Card className="border border-muted bg-card shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.svg" 
                width={150}
                height={80}
                alt="SportStore Logo"
                className="mx-auto"
              />
            </div>
            <CardTitle className="text-2xl text-center">Crear una cuenta</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus datos para registrarte en nuestra tienda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>

        {/* Right Side - Image and Info */}
        <div className="hidden lg:flex flex-col justify-center p-6 bg-slate-50 rounded-lg">
          <div className="relative h-80 w-full">
            <Image
              src="/register-hero.jpg" 
              fill
              style={{ objectFit: "cover" }}
              alt="Deportes"
              className="rounded-md opacity-90"
            />
          </div>
          <div className="mt-6 space-y-2">
            <h3 className="text-xl font-bold">¡Únete a SportStore!</h3>
            <p className="text-muted-foreground">
              Accede a descuentos exclusivos, guarda tus productos favoritos
              y recibe notificaciones sobre nuevas colecciones deportivas.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Envío gratis en tu primera compra</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Devoluciones sin costo por 30 días</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Programa de recompensas exclusivo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}