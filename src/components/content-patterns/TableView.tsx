"use client";

import { useState } from "react";
import {
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  SearchInput,
  Pagination,
  Button,
  Bullseye,
  Title,
} from "@patternfly/react-core";
import { Table, Thead, Tbody, Tr, Th, Td } from "@patternfly/react-table";

export interface TableRow {
  id: string | number;
  cells: (string | number | React.ReactNode)[];
}

export function TableView({
  columns,
  rows,
  title,
  isLoading = false,
  onSelectionChange,
}: {
  columns: string[];
  rows: TableRow[];
  title?: string;
  isLoading?: boolean;
  onSelectionChange?: (selected: (string | number)[]) => void;
}) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const filtered = rows.filter((r) =>
    r.cells.join(" ").toLowerCase().includes(filter.toLowerCase())
  );
  const start = (page - 1) * perPage;
  const pageRows = filtered.slice(start, start + perPage);

  const allVisibleSelected =
    pageRows.length > 0 && pageRows.every((r) => selectedIds.includes(r.id));

  const toggleRow = (id: string | number) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      onSelectionChange?.(next);
      return next;
    });
  };

  const toggleAllVisible = () => {
    const visibleIds = pageRows.map((r) => r.id);
    setSelectedIds((prev) => {
      const next = allVisibleSelected
        ? prev.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...prev, ...visibleIds]));
      onSelectionChange?.(next);
      return next;
    });
  };

  return (
    <>
      {title && (
        <PageSection>
          <Title headingLevel="h1" size="2xl">
            {title}
          </Title>
        </PageSection>
      )}
      <PageSection>
        <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput
              value={filter}
              onChange={(_e, v) => setFilter(v)}
              onClear={() => setFilter("")}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button
              variant="secondary"
              isDisabled={selectedIds.length === 0}
              onClick={() => setSelectedIds([])}
            >
              Clear selection ({selectedIds.length})
            </Button>
          </ToolbarItem>
        </ToolbarContent>
        <ToolbarContent>
          <ToolbarItem>
            <Pagination
              itemCount={filtered.length}
              perPage={perPage}
              page={page}
              onSetPage={(_e, p) => setPage(p)}
              onPerPageSelect={(_e, pp) => {
                setPerPage(pp);
                setPage(1);
              }}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      {isLoading ? (
        <Bullseye>
          <div>
            <Title headingLevel="h4">Loading</Title>
            <p>Please wait while we load data…</p>
          </div>
        </Bullseye>
      ) : filtered.length === 0 ? (
        <Bullseye>
          <div>
            <Title headingLevel="h4">No results</Title>
            <p>Try adjusting your search.</p>
          </div>
        </Bullseye>
      ) : (
        <Table aria-label="Data table">
          <Thead>
            <Tr>
              <Th
                select={{
                  onSelect: toggleAllVisible,
                  isSelected: allVisibleSelected,
                }}
                screenReaderText="Selection column"
              />
              {columns.map((c) => (
                <Th key={c}>{c}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {pageRows.map((r) => (
              <Tr key={r.id}>
                <Td
                  select={{
                    rowIndex: 0,
                    onSelect: () => toggleRow(r.id),
                    isSelected: selectedIds.includes(r.id),
                  }}
                />
                {r.cells.map((cell, i) => (
                  <Td key={`${r.id}-${i}`}>{cell}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      </PageSection>
    </>
  );
}
