import { CartItem } from "../cart/cart-item";

export interface OrderAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  instructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: OrderAddress;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  trackingNumber?: string;
  paymentMethod: string;
  estimatedDeliveryDate?: string;
}