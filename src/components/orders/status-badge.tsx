import React from "react";
import { Clock, Package, Truck, CheckCircle2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/models/orders/order";

interface StatusBadgeProps {
  status: Order["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<Order["status"], { color: string; icon: JSX.Element, label: string }> = {
    pending: { 
      color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", 
      icon: <Clock className="h-3 w-3 mr-1" />,
      label: "Pendiente"
    },
    processing: { 
      color: "bg-blue-100 text-blue-800 hover:bg-blue-100", 
      icon: <Package className="h-3 w-3 mr-1" />,
      label: "Procesando" 
    },
    shipped: { 
      color: "bg-purple-100 text-purple-800 hover:bg-purple-100", 
      icon: <Truck className="h-3 w-3 mr-1" />,
      label: "Enviado" 
    },
    delivered: { 
      color: "bg-green-100 text-green-800 hover:bg-green-100", 
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      label: "Entregado" 
    },
    cancelled: { 
      color: "bg-red-100 text-red-800 hover:bg-red-100", 
      icon: <X className="h-3 w-3 mr-1" />,
      label: "Cancelado" 
    }
  };

  const { color, icon, label } = variants[status];

  return (
    <Badge variant="outline" className={`${color} flex items-center font-normal`}>
      {icon}
      {label}
    </Badge>
  );
}