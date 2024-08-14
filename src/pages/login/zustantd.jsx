import { create } from "zustand";
import { persist } from "zustand/middleware";
import { account } from "../../appwrite/config";

export const useUserL = create(
  persist(
    (set) => {
      return {
        user: null,
        loginUser: async (mail, pass) => {
          await account.createEmailPasswordSession(mail, pass);
          const user = await account.get();
          set({ user });
        },
        logoutUser: () => {
          account.deleteSession("current");
          set({ user: null });
        },
      };
    },
    { name: "actual_admin" }
  )
);
