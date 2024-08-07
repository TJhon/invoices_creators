// store.js
import { create } from "zustand";
import { nanoid } from "nanoid";

const useInvoiceStore = create((set) => ({
  userName: "",
  typeInvoice: "Venta",
  items: [
    {
      id: nanoid(),
      item_name: "",
      item_price: null,
      item_qnt: null,
    },
  ],
  // todo: agregar la posibilidad de fotos para pagos y
  payments: [
    { id: nanoid(), how_payed: "Efectivo", who_received: "Jhon", payment: 0 },
  ],
  setUserName: (name) => set({ userName: name }),
  setTypeInvoice: (type) => set({ typeInvoice: type }),

  setItems: (items) => set({ items }),
  setPayments: (payments) => set({ payments }),
  addItem: () =>
    set((state) => ({
      items: [
        ...state.items,
        { id: nanoid(), item_name: "", item_price: null, item_qnt: null },
      ],
    })),
  removeItem: (id) =>
    set((state) => ({
      items:
        state.items.length > 1
          ? state.items.filter((item) => item.id !== id)
          : state.items,
    })),
  updateItem: (id, field, value) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })),
  addPayment: () =>
    set((state) => ({
      payments: [
        ...state.payments,
        {
          id: nanoid(),
          how_payed: "Efectivo",
          who_received: "Jhon",
          payment: 0,
        },
      ],
    })),
  removePayment: (index) =>
    set((state) => ({
      payments:
        state.payments.length > 1
          ? state.payments.filter((payment) => payment.id !== index)
          : state.payments,
    })),
  updatePayment: (id, field, value) =>
    set((state) => ({
      payments: state.payments.map((payment) =>
        payment.id == id ? { ...payment, [field]: value } : payment
      ),
    })),
}));

export default useInvoiceStore;
