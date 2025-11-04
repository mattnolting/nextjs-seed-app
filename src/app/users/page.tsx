"use client";

import { TableView } from "@/components/content-patterns/TableView";

// Mock data for demo
const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  cells: [
    `User ${i + 1}`,
    `user${i + 1}@example.com`,
    `Role ${i % 3 === 0 ? "Admin" : i % 3 === 1 ? "User" : "Guest"}`,
  ],
}));

export default function Users() {
  return (
    <TableView columns={["Name", "Email", "Role"]} rows={mockUsers} />
  );
}
