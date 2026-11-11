"use client";

import * as React from "react";
import { Drawer } from "@/components/ui/drawer";
import { Transaction } from "@/types";
import { formatNaira, formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Check,
  Share2,
  Download,
  Building2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

interface TransactionDrawerProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDrawer({ transaction, isOpen, onClose }: TransactionDrawerProps) {
  const [copied, setCopied] = React.useState(false);

  if (!transaction) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusIcons = {
    successful: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    pending: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    failed: <XCircle className="w-4 h-4 text-rose-500" />,
  };

  const statusBadges = {
    successful: <Badge variant="success">Completed</Badge>,
    pending: <Badge variant="warning">Processing</Badge>,
    failed: <Badge variant="danger">Failed</Badge>,
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Transaction Receipt">
      <div className="space-y-6">
        {/* Receipt Header / Amount */}
        <div className="text-center p-6 rounded-2xl bg-muted/40 border border-border/60 card-highlight space-y-2">
          <div className="flex justify-center mb-1">
            <div className="p-3 rounded-full bg-card border border-border shadow-sm">
              <Building2 className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
            {formatNaira(transaction.amount)}
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {transaction.title}
          </p>
          <div className="pt-2 flex justify-center">{statusBadges[transaction.status]}</div>
        </div>

        {/* Transaction Meta Details */}
        <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3.5 text-xs card-highlight">
          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="text-muted-foreground">Transaction Reference</span>
            <div className="flex items-center gap-1.5 font-mono font-semibold text-foreground">
              <span>{transaction.reference}</span>
              <button
                onClick={handleCopyRef}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Copy reference"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium text-foreground">
              {formatDate(transaction.date)} at {formatTime(transaction.date)}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="text-muted-foreground">Payment Channel</span>
            <span className="font-medium text-foreground">{transaction.channel}</span>
          </div>

          {transaction.bankName && (
            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Bank Institution</span>
              <span className="font-medium text-foreground">{transaction.bankName}</span>
            </div>
          )}

          {transaction.accountNumber && (
            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Account Number</span>
              <span className="font-mono text-foreground">{transaction.accountNumber}</span>
            </div>
          )}

          <div className="pt-1">
            <span className="text-muted-foreground block mb-1">Description / Memo</span>
            <p className="text-foreground bg-muted/50 p-2.5 rounded-lg leading-relaxed">
              {transaction.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button
            onClick={() => alert("Receipt shared to clipboard/device.")}
            className="w-full gap-2"
            variant="primary"
          >
            <Share2 className="w-4 h-4" />
            Share Official Receipt
          </Button>

          <Button
            onClick={() => alert("Downloading PDF official statement voucher...")}
            className="w-full gap-2"
            variant="outline"
          >
            <Download className="w-4 h-4" />
            Download PDF Voucher
          </Button>
        </div>

        {/* Security watermark footer */}
        <div className="text-center text-[11px] text-muted-foreground pt-2">
          🔒 Digitally signed by Tare Cooperative Banking System (CBN/NDPR Standard)
        </div>
      </div>
    </Drawer>
  );
}
