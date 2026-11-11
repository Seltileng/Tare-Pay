export type UserRole = "Member" | "Guarantor" | "Treasurer" | "President" | "Admin";

export interface Member {
  id: string;
  memberNo: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  bvn: string;
  nin: string;
  tier: "Standard" | "Bronze" | "Silver" | "Gold" | "Platinum";
  status: "active" | "pending_verification" | "suspended";
  joinedDate: string;
  avatarUrl?: string;
  state: string;
  lga: string;
  address: string;
  sharesOwned: number;
  maxShareLimit: number;
}

export interface Balances {
  totalSavings: number;
  shareCapital: number;
  loanBalance: number;
  availableLoanLimit: number;
  totalDividendsEarned: number;
  monthlyContributionDue: number;
}

export type TransactionType =
  | "deposit"
  | "withdrawal"
  | "loan_disbursement"
  | "loan_repayment"
  | "dividend_payout"
  | "share_purchase"
  | "monthly_levy";

export type TransactionStatus = "successful" | "pending" | "failed";

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  description: string;
  channel: "Bank Transfer" | "Card" | "Direct Debit" | "Wallet";
  accountNumber?: string;
  bankName?: string;
}

export interface Loan {
  id: string;
  loanNumber: string;
  amount: number;
  interestRate: number; // e.g. 5%
  tenureMonths: number;
  purpose: string;
  status: "pending_guarantors" | "under_review" | "approved" | "active" | "repaid" | "overdue";
  monthlyRepayment: number;
  amountPaid: number;
  nextDueDate: string;
  startDate: string;
  guarantors: {
    id: string;
    name: string;
    phone: string;
    status: "pending" | "approved" | "rejected";
    guaranteedAmount: number;
  }[];
}

export interface NextOfKin {
  id: string;
  fullName: string;
  relationship: string;
  phone: string;
  email?: string;
  allocationPercentage: number;
}

export interface DividendRecord {
  id: string;
  financialYear: number;
  declaredDate: string;
  dividendPerShare: number;
  totalSharesEligible: number;
  netPayout: number;
  status: "paid" | "approved" | "projected";
  payoutDate?: string;
}

export interface GovernanceMeeting {
  id: string;
  title: string;
  type: "AGM" | "EGM" | "Committee";
  date: string;
  time: string;
  venue: string;
  status: "upcoming" | "in_session" | "concluded";
  isVirtual: boolean;
  virtualLink?: string;
  documents: { title: string; size: string; downloadUrl: string }[];
}

export interface Resolution {
  id: string;
  meetingId: string;
  number: string;
  title: string;
  description: string;
  status: "voting_open" | "passed" | "rejected";
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  userVote?: "for" | "against" | "abstain";
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    role: string;
    email: string;
  };
  action: string;
  category: "auth" | "loan" | "contribution" | "user_management" | "settings";
  ipAddress: string;
  status: "success" | "warning" | "danger";
  details: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  timeGroup: "today" | "earlier";
  type: "savings" | "loan" | "governance" | "security" | "dividend";
  read: boolean;
  link?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
  isVerified: boolean;
}

export interface SupportArticle {
  id: string;
  title: string;
  category: string;
  snippet: string;
  readTime: string;
}
