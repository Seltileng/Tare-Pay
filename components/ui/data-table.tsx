"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  SlidersHorizontal,
  Search,
  Download,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  mobileHidden?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  onRowClick?: (item: T) => void;
  renderMobileCard?: (item: T, isSelected: boolean, onSelect: () => void) => React.ReactNode;
  idKey?: keyof T;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search records...",
  searchKey,
  onRowClick,
  renderMobileCard,
  idKey = "id" as keyof T,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [isCompact, setIsCompact] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(columns.map((c) => c.key))
  );
  const [showColMenu, setShowColMenu] = React.useState(false);

  // Filter
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) => {
      if (searchKey) {
        return String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase());
      }
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm, searchKey]);

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === "asc") setSortOrder("desc");
      else {
        setSortKey(null);
        setSortOrder("asc");
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === sortedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedData.map((d) => String(d[idKey]))));
    }
  };

  const handleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleColVisibility = (key: string) => {
    const next = new Set(visibleColumns);
    if (next.has(key)) {
      if (next.size > 1) next.delete(key);
    } else {
      next.add(key);
    }
    setVisibleColumns(next);
  };

  return (
    <div className="w-full space-y-3">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            leftIcon={<Search className="w-4 h-4" />}
            className="h-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Density toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsCompact(!isCompact)}
            className="h-10 text-xs px-3"
            title="Toggle Row Density"
          >
            {isCompact ? "Normal" : "Compact"}
          </Button>

          {/* Column visibility menu */}
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowColMenu(!showColMenu)}
              className="h-10 text-xs gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Columns
            </Button>

            {showColMenu && (
              <div className="absolute right-0 top-12 z-20 w-48 rounded-xl border border-border/80 bg-card p-2 shadow-lg card-highlight">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase px-2 py-1">
                  Visible Columns
                </p>
                {columns.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs text-foreground hover:bg-muted rounded-lg cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.has(col.key)}
                      onChange={() => toggleColVisibility(col.key)}
                      className="rounded text-accent focus:ring-accent"
                    />
                    {col.header}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent-700 dark:text-accent-300">
          <span className="font-semibold">{selectedIds.size} row(s) selected</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert(`Exporting ${selectedIds.size} records to CSV`)}
              className="h-8 text-xs gap-1.5 border-accent/30"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedIds(new Set())}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              Deselect All
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-border/80 bg-card card-highlight">
        <div className="overflow-x-auto max-h-[560px]">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-muted/50 sticky top-0 z-10 border-b border-border text-xs uppercase font-semibold text-muted-foreground tracking-wider select-none">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === sortedData.length && sortedData.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                    className="rounded text-accent focus:ring-accent"
                  />
                </th>
                {columns
                  .filter((col) => visibleColumns.has(col.key))
                  .map((col) => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={cn(
                        "px-4 py-3 font-semibold",
                        col.sortable && "cursor-pointer hover:text-foreground transition-colors"
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-muted-foreground/60">
                            {sortKey === col.key ? (
                              sortOrder === "asc" ? (
                                <ChevronUp className="w-3.5 h-3.5 text-foreground" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-foreground" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-3.5 h-3.5" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="py-8 text-center text-muted-foreground">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                sortedData.map((item) => {
                  const id = String(item[idKey]);
                  const isSelected = selectedIds.has(id);
                  return (
                    <tr
                      key={id}
                      onClick={() => onRowClick && onRowClick(item)}
                      className={cn(
                        "transition-colors hover:bg-muted/40",
                        isSelected && "bg-accent/5",
                        onRowClick && "cursor-pointer",
                        isCompact ? "py-1.5" : "py-3"
                      )}
                    >
                      <td className={cn("px-4", isCompact ? "py-2" : "py-3.5")} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(id, e as any)}
                          aria-label={`Select row ${id}`}
                          className="rounded text-accent focus:ring-accent"
                        />
                      </td>
                      {columns
                        .filter((col) => visibleColumns.has(col.key))
                        .map((col) => (
                          <td key={col.key} className={cn("px-4", isCompact ? "py-2" : "py-3.5")}>
                            {col.render ? col.render(item) : item[col.key]}
                          </td>
                        ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card-List Fallback (below 640px) */}
      <div className="sm:hidden space-y-3">
        {sortedData.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground border border-dashed rounded-xl">
            No matching records found.
          </div>
        ) : (
          sortedData.map((item) => {
            const id = String(item[idKey]);
            const isSelected = selectedIds.has(id);

            if (renderMobileCard) {
              return (
                <div key={id} onClick={() => onRowClick && onRowClick(item)}>
                  {renderMobileCard(item, isSelected, () => handleSelectRow(id, {} as any))}
                </div>
              );
            }

            return (
              <div
                key={id}
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  "p-4 rounded-xl border border-border bg-card space-y-2 card-highlight",
                  isSelected && "border-accent bg-accent/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">ID: {id}</span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleSelectRow(id, e as any)}
                    aria-label={`Select row ${id}`}
                    className="rounded text-accent"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  {columns
                    .filter((c) => !c.mobileHidden)
                    .map((col) => (
                      <div key={col.key} className="flex justify-between py-0.5">
                        <span className="text-xs text-muted-foreground">{col.header}:</span>
                        <span className="text-xs font-medium text-foreground">
                          {col.render ? col.render(item) : item[col.key]}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
