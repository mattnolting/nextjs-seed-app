"use client";

import { TableView } from "@/components/content-patterns/TableView";
import { useAppData } from "@/lib/data/useAppData";

export default function Users() {
  const { data, loading, error } = useAppData();

  // Toggle hooks for content pattern selection
  const useTableView = true;

  if (loading) {
    return <TableView columns={[]} rows={[]} title="Users" />;
  }

  if (error) {
    return (
      <TableView
        columns={[]}
        rows={[]}
        title="Users"
      />
    );
  }

  if (useTableView && data?.tableView) {
    return (
      <TableView
        columns={data.tableView.columns || []}
        rows={data.tableView.rows || []}
        title="Users"
      />
    );
  }

  return (
    <TableView columns={[]} rows={[]} title="Users" />
  );
}
