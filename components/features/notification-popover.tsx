"use client";

import * as React from "react";
import { Bell, CheckCheck, Clock } from "lucide-react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { formatTime, formatDate } from "@/lib/utils";
import Link from "next/link";

export function NotificationPopover() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const todayItems = notifications.filter((n) => n.timeGroup === "today");
  const earlierItems = notifications.filter((n) => n.timeGroup === "earlier");

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications"
        className="relative p-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Bell className="w-5 h-5" strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-80 sm:w-96 rounded-2xl border border-border/80 bg-card p-4 shadow-modal card-highlight">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-semibold">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 text-xs text-accent-700 dark:text-accent-400 hover:underline font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-border/40 py-2">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No notifications right now.
              </div>
            ) : (
              <>
                {todayItems.length > 0 && (
                  <div className="py-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider px-2 py-1">
                      Today
                    </p>
                    {todayItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markAsRead(item.id)}
                        className={`p-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                          !item.read ? "bg-accent/5 font-medium" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-foreground">{item.title}</p>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {formatTime(item.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.message}
                        </p>
                        {item.link && (
                          <Link
                            href={item.link}
                            onClick={() => setIsOpen(false)}
                            className="text-[11px] text-accent font-semibold hover:underline mt-1 inline-block"
                          >
                            View details →
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {earlierItems.length > 0 && (
                  <div className="py-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider px-2 py-1">
                      Earlier
                    </p>
                    {earlierItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markAsRead(item.id)}
                        className={`p-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                          !item.read ? "bg-accent/5" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-foreground">{item.title}</p>
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(item.timestamp, { day: "numeric", month: "short" })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
