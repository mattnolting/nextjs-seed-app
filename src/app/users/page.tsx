"use client";

import { TableView } from "@/components/content-patterns/TableView";

export default function Users() {
  return (
    <TableView
      columns={["Name", "Role", "Status"]}
      rows={Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        cells: [
          `User ${i + 1}`,
          i % 5 === 0 ? "Admin" : i % 3 === 0 ? "Maintainer" : "User",
          i % 4 === 0 ? "Pending" : i % 2 === 0 ? "Active" : "Invited",
        ],
      }))}
    />
  );
}
