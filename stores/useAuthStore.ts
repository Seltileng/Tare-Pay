import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole, Member } from "@/types";
import { MOCK_USER } from "@/mocks/data";

interface AuthState {
  user: Member;
  currentRole: UserRole;
  isAuthenticated: boolean;
  isLocked: boolean;
  hasTransactionPin: boolean;
  transactionPin: string;
  sessionTimeoutWarning: boolean;
  sessionSecondsLeft: number;

  setRole: (role: UserRole) => void;
  setUser: (user: Partial<Member>) => void;
  setTransactionPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
  lockApp: () => void;
  unlockApp: () => void;
  resetSessionTimer: () => void;
  triggerSessionWarning: () => void;
  dismissSessionWarning: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: MOCK_USER,
      currentRole: "Member",
      isAuthenticated: true,
      isLocked: false,
      hasTransactionPin: true,
      transactionPin: "1234",
      sessionTimeoutWarning: false,
      sessionSecondsLeft: 60,

      setRole: (role: UserRole) => set({ currentRole: role }),

      setUser: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),

      setTransactionPin: (pin: string) =>
        set({
          transactionPin: pin,
          hasTransactionPin: true,
        }),

      verifyPin: (pin: string) => {
        return pin === get().transactionPin;
      },

      lockApp: () => set({ isLocked: true }),

      unlockApp: () => set({ isLocked: false }),

      resetSessionTimer: () =>
        set({
          sessionTimeoutWarning: false,
          sessionSecondsLeft: 60,
        }),

      triggerSessionWarning: () =>
        set({
          sessionTimeoutWarning: true,
          sessionSecondsLeft: 60,
        }),

      dismissSessionWarning: () =>
        set({
          sessionTimeoutWarning: false,
          sessionSecondsLeft: 60,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          sessionTimeoutWarning: false,
        }),
    }),
    {
      name: "tarepay-auth-storage",
      partialize: (state) => ({
        currentRole: state.currentRole,
        hasTransactionPin: state.hasTransactionPin,
        transactionPin: state.transactionPin,
      }),
    }
  )
);
