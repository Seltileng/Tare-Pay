import {
  MOCK_USER,
  MOCK_BALANCES,
  MOCK_TRANSACTIONS,
  MOCK_LOANS,
  MOCK_DIVIDENDS,
  MOCK_MEETINGS,
  MOCK_RESOLUTIONS,
  MOCK_NOTIFICATIONS,
  MOCK_BANK_ACCOUNTS,
  MOCK_AUDIT_LOGS,
} from "./data";
import { delay } from "@/lib/utils";
import { Transaction, Loan, Resolution, BankAccount } from "@/types";

// Configuration for mock API simulation
export interface MockApiConfig {
  simulatedDelayMs: number;
  shouldFail: boolean;
  emptyState: boolean;
}

export const mockApiConfig: MockApiConfig = {
  simulatedDelayMs: 600,
  shouldFail: false,
  emptyState: false,
};

export function setMockApiConfig(updates: Partial<MockApiConfig>) {
  Object.assign(mockApiConfig, updates);
}

async function handleSimulation<T>(data: T): Promise<T> {
  await delay(mockApiConfig.simulatedDelayMs);
  if (mockApiConfig.shouldFail) {
    throw new Error("Simulated network anomaly: Unable to connect to Tare-pay core banking gateway.");
  }
  if (mockApiConfig.emptyState) {
    if (Array.isArray(data)) {
      return [] as unknown as T;
    }
  }
  return data;
}

export const mockApi = {
  getUser: async () => handleSimulation(MOCK_USER),

  getBalances: async () => handleSimulation(MOCK_BALANCES),

  getTransactions: async (typeFilter?: string): Promise<Transaction[]> => {
    let list = [...MOCK_TRANSACTIONS];
    if (typeFilter && typeFilter !== "all") {
      list = list.filter((t) => t.type === typeFilter);
    }
    return handleSimulation(list);
  },

  getLoans: async (): Promise<Loan[]> => handleSimulation(MOCK_LOANS),

  getDividends: async () => handleSimulation(MOCK_DIVIDENDS),

  getMeetings: async () => handleSimulation(MOCK_MEETINGS),

  getResolutions: async (): Promise<Resolution[]> => handleSimulation(MOCK_RESOLUTIONS),

  castVote: async (resolutionId: string, choice: "for" | "against" | "abstain") => {
    await delay(500);
    const target = MOCK_RESOLUTIONS.find((r) => r.id === resolutionId);
    if (target) {
      target.userVote = choice;
      if (choice === "for") target.votesFor++;
      if (choice === "against") target.votesAgainst++;
      if (choice === "abstain") target.votesAbstain++;
    }
    return { success: true, resolutionId, choice };
  },

  getNotifications: async () => handleSimulation(MOCK_NOTIFICATIONS),

  getBankAccounts: async (): Promise<BankAccount[]> => handleSimulation(MOCK_BANK_ACCOUNTS),

  verifyNuban: async (bankCode: string, accountNumber: string) => {
    await delay(800);
    if (accountNumber.length !== 10) {
      throw new Error("NUBAN Account number must be exactly 10 digits");
    }
    return {
      verified: true,
      accountName: "CHINEDU EMMANUEL OKAFOR",
      bankCode,
      accountNumber,
    };
  },

  verifyBvnNin: async (type: "BVN" | "NIN", value: string) => {
    await delay(1200);
    if (value.length !== 11) {
      throw new Error(`${type} must be exactly 11 digits`);
    }
    // Simulate invalid BVN check
    if (value === "00000000000") {
      throw new Error(`Invalid ${type}. Identity verification failed with NIBSS.`);
    }
    return {
      verified: true,
      name: "Chinedu Emmanuel Okafor",
      dateOfBirth: "1988-06-14",
      phone: "0803***7890",
    };
  },

  getAuditLogs: async () => handleSimulation(MOCK_AUDIT_LOGS),
};
