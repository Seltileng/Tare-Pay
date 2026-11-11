import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface KinAllocation {
  id: string;
  fullName: string;
  relationship: string;
  phone: string;
  allocation: number; // Percentage 0 - 100
}

export interface OnboardingState {
  currentStep: number;
  highestCompletedStep: number;

  // Step 1: Personal
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  state: string;
  lga: string;
  address: string;

  // Step 2: BVN/NIN
  bvn: string;
  nin: string;
  bvnStatus: "idle" | "verifying" | "verified" | "failed";
  ninStatus: "idle" | "verifying" | "verified" | "failed";

  // Step 3: Documents
  passportPhoto: string | null;
  utilityBill: string | null;

  // Step 4: Liveness/Selfie
  selfieCaptured: boolean;

  // Step 5: Next of Kin
  nextOfKinList: KinAllocation[];

  // Step 6: Share Capital
  shareUnits: number;
  sharePrice: number; // ₦25
  maxShareLimit: number; // 200,000 (20% cap)

  // Step 7: Agreement
  agreedToByeLaws: boolean;
  isSubmitted: boolean;

  // Actions
  setStep: (step: number) => void;
  updateData: (data: Partial<OnboardingState>) => void;
  addNextOfKin: (kin: KinAllocation) => void;
  updateNextOfKin: (id: string, updates: Partial<KinAllocation>) => void;
  removeNextOfKin: (id: string) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      highestCompletedStep: 1,

      firstName: "Chinedu",
      lastName: "Okafor",
      phone: "08034567890",
      email: "chinedu.okafor@example.ng",
      state: "Lagos",
      lga: "Ikeja",
      address: "14 Adeola Odeku St, Victoria Island",

      bvn: "22248910482",
      nin: "89124019284",
      bvnStatus: "verified",
      ninStatus: "verified",

      passportPhoto: "/mock-passport.jpg",
      utilityBill: "/mock-bill.pdf",

      selfieCaptured: true,

      nextOfKinList: [
        {
          id: "nok_01",
          fullName: "Amaka Blessing Okafor",
          relationship: "Spouse",
          phone: "08098765432",
          allocation: 70,
        },
        {
          id: "nok_02",
          fullName: "Kenechukwu David Okafor",
          relationship: "Child",
          phone: "08051234567",
          allocation: 30,
        },
      ],

      shareUnits: 40000,
      sharePrice: 25,
      maxShareLimit: 200000,

      agreedToByeLaws: true,
      isSubmitted: false,

      setStep: (step: number) =>
        set((state) => ({
          currentStep: step,
          highestCompletedStep: Math.max(state.highestCompletedStep, step),
        })),

      updateData: (data) => set((state) => ({ ...state, ...data })),

      addNextOfKin: (kin) =>
        set((state) => ({
          nextOfKinList: [...state.nextOfKinList, kin],
        })),

      updateNextOfKin: (id, updates) =>
        set((state) => ({
          nextOfKinList: state.nextOfKinList.map((k) => (k.id === id ? { ...k, ...updates } : k)),
        })),

      removeNextOfKin: (id) =>
        set((state) => ({
          nextOfKinList: state.nextOfKinList.filter((k) => k.id !== id),
        })),

      resetOnboarding: () =>
        set({
          currentStep: 1,
          highestCompletedStep: 1,
          isSubmitted: false,
        }),
    }),
    {
      name: "tarepay-onboarding-draft",
    }
  )
);
