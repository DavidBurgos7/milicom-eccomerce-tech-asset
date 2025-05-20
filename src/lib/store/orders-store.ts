import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../models/orders/order';
import { OrdersStore } from '../models/orders/order-store';

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      getOrderById: (id) => {
        return get().orders.find(order => order.id === id);
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find(order => order.orderNumber === orderNumber);
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status } : order
          )
        }));
      },

      cancelOrder: (id) => {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status: 'cancelled' } : order
          )
        }));
      },

      getAllOrders: () => {
        return get().orders;
      }
    }),
    {
      name: 'orders-storage',
    }
  )
);

// Mock de pedidos para propósitos de demostración
export const generateMockOrders = (): Order[] => {
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-123456',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días atrás
      status: 'delivered',
      items: [
        {
          product: {
            id: 1,
            name: "Nike Air Max 270 React",
            price: 129.99,
            originalPrice: 159.99,
            rating: 4.5,
            reviewCount: 234,
            image: "/api/placeholder/400/400",
            category: "Running",
            brand: "Nike",
            isOnSale: true
          },
          quantity: 1,
          selectedSize: "9",
          selectedColor: "black"
        }
      ],
      shippingAddress: {
        firstName: "Juan",
        lastName: "Pérez",
        street: "Calle Principal 123",
        city: "Madrid",
        state: "Madrid",
        zipCode: "28001",
        country: "España",
        phone: "612345678"
      },
      total: 142.99,
      subtotal: 129.99,
      tax: 13.00,
      shippingCost: 0,
      trackingNumber: "TRK98765432",
      paymentMethod: "Tarjeta de crédito",
      estimatedDeliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 días atrás
    },
    {
      id: '2',
      orderNumber: 'ORD-789012',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
      status: 'shipped',
      items: [
        {
          product: {
            id: 2,
            name: "Adidas Ultraboost 22",
            price: 89.99,
            rating: 4.8,
            reviewCount: 567,
            image: "/api/placeholder/400/400",
            category: "Running",
            brand: "Adidas",
            isNew: true
          },
          quantity: 1,
          selectedSize: "8",
          selectedColor: "white"
        },
        {
          product: {
            id: 5,
            name: "Nike Dri-FIT Running Shirt",
            price: 24.99,
            rating: 4.2,
            reviewCount: 89,
            image: "/api/placeholder/400/400",
            category: "Ropa",
            brand: "Nike"
          },
          quantity: 2,
          selectedSize: "M",
          selectedColor: "black"
        }
      ],
      shippingAddress: {
        firstName: "Ana",
        lastName: "García",
        street: "Avenida Central 45",
        city: "Barcelona",
        state: "Cataluña",
        zipCode: "08001",
        country: "España",
        phone: "698765432"
      },
      total: 153.07,
      subtotal: 139.97,
      tax: 13.10,
      shippingCost: 0,
      trackingNumber: "TRK12345678",
      paymentMethod: "PayPal",
      estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 días después
    },
    {
      id: '3',
      orderNumber: 'ORD-345678',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
      status: 'processing',
      items: [
        {
          product: {
            id: 6,
            name: "Adidas Predator Edge.1 FG",
            price: 199.99,
            originalPrice: 229.99,
            rating: 4.7,
            reviewCount: 156,
            image: "/api/placeholder/400/400",
            category: "Fútbol",
            brand: "Adidas",
            isOnSale: true
          },
          quantity: 1,
          selectedSize: "10",
          selectedColor: "black"
        }
      ],
      shippingAddress: {
        firstName: "Miguel",
        lastName: "Rodríguez",
        street: "Plaza Mayor 7",
        city: "Sevilla",
        state: "Andalucía",
        zipCode: "41001",
        country: "España",
        phone: "654321987"
      },
      total: 219.99,
      subtotal: 199.99,
      tax: 20.00,
      shippingCost: 0,
      paymentMethod: "Tarjeta de crédito",
      estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 días después
    },
    {
      id: '4',
      orderNumber: 'ORD-901234',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 días atrás
      status: 'cancelled',
      items: [
        {
          product: {
            id: 4,
            name: "Puma RS-X Reinvention",
            price: 79.99,
            rating: 4.1,
            reviewCount: 145,
            image: "/api/placeholder/400/400",
            category: "Lifestyle",
            brand: "Puma",
            isNew: true
          },
          quantity: 1,
          selectedSize: "9",
          selectedColor: "yellow"
        }
      ],
      shippingAddress: {
        firstName: "Laura",
        lastName: "Martínez",
        street: "Calle Nueva 23",
        city: "Valencia",
        state: "Valencia",
        zipCode: "46001",
        country: "España",
        phone: "678912345"
      },
      total: 87.99,
      subtotal: 79.99,
      tax: 8.00,
      shippingCost: 0,
      paymentMethod: "Tarjeta de débito"
    },
    {
      id: '5',
      orderNumber: 'ORD-567890',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
      status: 'pending',
      items: [
        {
          product: {
            id: 3,
            name: "Under Armour HOVR Phantom 3",
            price: 99.99,
            originalPrice: 119.99,
            rating: 4.3,
            reviewCount: 189,
            image: "/api/placeholder/400/400",
            category: "Running",
            brand: "Under Armour",
            isOnSale: true
          },
          quantity: 1,
          selectedSize: "10",
          selectedColor: "red"
        },
        {
          product: {
            id: 12,
            name: "Nike Pro Combat Shorts",
            price: 34.99,
            rating: 4.0,
            reviewCount: 123,
            image: "/api/placeholder/400/400",
            category: "Ropa",
            brand: "Nike"
          },
          quantity: 1,
          selectedSize: "L",
          selectedColor: "black"
        }
      ],
      shippingAddress: {
        firstName: "Carlos",
        lastName: "Sánchez",
        street: "Avenida del Mar 12",
        city: "Málaga",
        state: "Andalucía",
        zipCode: "29001",
        country: "España",
        phone: "612345987"
      },
      total: 148.48,
      subtotal: 134.98,
      tax: 13.50,
      shippingCost: 0,
      paymentMethod: "Transferencia bancaria",
      estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 días después
    }
  ];

  return mockOrders;
};

// TODO: Cambiar esto por una llamada a la API real
export const initializeOrdersStore = () => {
  const { orders, addOrder } = useOrdersStore.getState();
  
  if (orders.length === 0) {
    const mockOrders = generateMockOrders();
    mockOrders.forEach(order => addOrder(order));
  }
};