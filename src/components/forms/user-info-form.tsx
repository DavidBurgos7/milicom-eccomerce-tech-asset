"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { UserFormFields, UserInfoFormData, userInfoSchema, useUserInfoStore } from '@/lib/store/user-store';
import { UpdateUserRequestDto } from '@/lib/models/users/dtos/UpdateUserRequestDto';
import { userService } from '@/services/user-service';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { da } from 'date-fns/locale';


export const UserInfoForm = () => {
  const { userInfo, setUserInfo ,isLoading, error, clearError } = useUserInfoStore();

  const form = useForm<UserFormFields>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: userInfo,
  });

  const onSubmit = async (data: UserFormFields) => {
    const updateDto: UpdateUserRequestDto = {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        shippingAddress: `${data.shippingAddress} ${data.street}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}. | ${data.instructions ? ` Instrucciones: ${data.instructions}` : ''}`,
        phoneNumber: data.phoneNumber,
    }

    try {
        const response = await userService.updateUser(userInfo.id, updateDto);

        setUserInfo({...data, id: userInfo.id});

        toast.success('Información actualizada correctamente');
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al procesar el pedido. Por favor, inténtalo de nuevo más tarde.';
        toast.error(`Error: ${errorMessage}`);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const isoDate = format(date, 'yyyy-MM-dd');
      form.setValue('birthDate', isoDate);
    }
  };

  useEffect(() => {
    // Actualizar el formulario con la información del usuario al cargar
    form.reset(userInfo);
  }, [userInfo]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>
          Actualiza tu información personal. Solo se enviarán los campos que modifiques.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Nacimiento *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={handleDateSelect}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown"
                        fromYear={new Date().getFullYear() - 100}
                        toYear={2025}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Tu fecha de nacimiento en formato DD/MM/YYYY
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu número de teléfono" {...field} />
                  </FormControl>
                  <FormDescription>
                    Incluye el código de país si es necesario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección de Envío *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escribe tu dirección completa de envío..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Dirección donde quieres recibir tus pedidos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Ciudad *</FormLabel>
                    <FormControl>
                        <Input placeholder='Tu ciudad' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Departamento/Estado *</FormLabel>
                    <FormControl>
                        <Input placeholder='Tu departamento/estado/provincia' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Código Postal *</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>País *</FormLabel>
                    <FormControl>
                        <Input placeholder='Tu país' {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Instrucciones de entrega (opcional)</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Apartamento 123, torre 2, unidad 5, etc."
                        className="resize-none"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 text-red-600"
                  onClick={clearError}
                >
                  Cerrar
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Actualizando...' : 'Actualizar Información'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};