"use client";

import Image from "next/image";
import React, { Fragment, useState, useEffect } from "react";
import {
  Bullseye,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Content,
  Dropdown,
  DropdownItem,
  DropdownList,
  EmptyState,
  EmptyStateFooter,
  EmptyStateVariant,
  EmptyStateActions,
  Gallery,
  MenuToggle,
  MenuToggleCheckbox,
  PageSection,
  Pagination,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
} from "@patternfly/react-core";
import type { SVGIconProps } from "@patternfly/react-icons/dist/esm/createIcon";
import TrashIcon from "@patternfly/react-icons/dist/esm/icons/trash-icon";
import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";
import CodeBranchIcon from "@patternfly/react-icons/dist/esm/icons/code-branch-icon";
import DollarSignIcon from "@patternfly/react-icons/dist/esm/icons/dollar-sign-icon";
import ChartLineIcon from "@patternfly/react-icons/dist/esm/icons/chart-line-icon";
import BullhornIcon from "@patternfly/react-icons/dist/esm/icons/bullhorn-icon";
import WarehouseIcon from "@patternfly/react-icons/dist/esm/icons/warehouse-icon";
import UsersIcon from "@patternfly/react-icons/dist/esm/icons/users-icon";
import CalculatorIcon from "@patternfly/react-icons/dist/esm/icons/calculator-icon";
import ServerIcon from "@patternfly/react-icons/dist/esm/icons/server-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import ShieldAltIcon from "@patternfly/react-icons/dist/esm/icons/shield-alt-icon";
import ShoppingCartIcon from "@patternfly/react-icons/dist/esm/icons/shopping-cart-icon";
import DatabaseIcon from "@patternfly/react-icons/dist/esm/icons/database-icon";
import EnvelopeIcon from "@patternfly/react-icons/dist/esm/icons/envelope-icon";
import TruckIcon from "@patternfly/react-icons/dist/esm/icons/truck-icon";
import { Icon } from "@patternfly/react-core";

// Icon mapping object
const icons: Record<string, React.ComponentType<SVGIconProps>> = {
  "code-branch": CodeBranchIcon,
  "dollar-sign": DollarSignIcon,
  "chart-line": ChartLineIcon,
  bullhorn: BullhornIcon,
  warehouse: WarehouseIcon,
  users: UsersIcon,
  calculator: CalculatorIcon,
  server: ServerIcon,
  "check-circle": CheckCircleIcon,
  "shield-alt": ShieldAltIcon,
  "shopping-cart": ShoppingCartIcon,
  database: DatabaseIcon,
  envelope: EnvelopeIcon,
  truck: TruckIcon,
};

export interface CardItem {
  id: string | number;
  title: string;
  content?: React.ReactNode;
  description?: string;
  icon?: string;
  image?: string;
  meta?: Record<string, string>;
}

export interface CardViewProps {
  items: CardItem[];
  title?: string;
  description?: string;
  showEmptyState?: boolean;
  emptyStateAction?: () => void;
  onCardSelect?: (selectedIds: (string | number)[]) => void;
  onCardDelete?: (item: CardItem) => void;
  enableSelection?: boolean;
  enablePagination?: boolean;
  defaultPerPage?: number;
}

function CardViewToolbar({
  selectedCount,
  areAllSelected,
  enableSelection,
  enablePagination,
  perPage,
  totalItemCount,
  isSelectDropdownOpen,
  onToggleSelectDropdown,
  onSelectDropdownOpenChange,
  onSelectToggle,
  onSelectNone,
  onSelectPage,
  onSelectAll,
  onDeleteSelected,
  renderPagination,
}: {
  selectedCount: number;
  areAllSelected: boolean;
  enableSelection: boolean;
  enablePagination: boolean;
  perPage: number;
  totalItemCount: number;
  isSelectDropdownOpen: boolean;
  onToggleSelectDropdown: () => void;
  onSelectDropdownOpenChange: (isOpen: boolean) => void;
  onSelectToggle: () => void;
  onSelectNone: () => void;
  onSelectPage: () => void;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  renderPagination: () => React.ReactNode;
}) {
  const anySelected = selectedCount > 0;

  return (
    <Toolbar id="card-view-toolbar">
      <ToolbarContent>
        {enableSelection && (
          <ToolbarItem>
            <Dropdown
              onSelect={onSelectNone}
              isOpen={isSelectDropdownOpen}
              onOpenChange={onSelectDropdownOpenChange}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  isExpanded={isSelectDropdownOpen}
                  onClick={onToggleSelectDropdown}
                  aria-label="Select cards"
                  splitButtonItems={[
                    <MenuToggleCheckbox
                      id="card-view-select-all"
                      key="card-view-select-all"
                      aria-label={
                        anySelected ? "Deselect all cards" : "Select all cards"
                      }
                      isChecked={areAllSelected}
                      onClick={(event) => {
                        event.preventDefault();
                        onSelectToggle();
                      }}
                    >
                      {selectedCount !== 0 && `${selectedCount} selected`}
                    </MenuToggleCheckbox>,
                  ]}
                ></MenuToggle>
              )}
            >
              <DropdownList>
                <DropdownItem key="select-none" onClick={onSelectNone}>
                  Select none (0 items)
                </DropdownItem>
                <DropdownItem key="select-page" onClick={onSelectPage}>
                  Select page ({Math.min(perPage, totalItemCount)} items)
                </DropdownItem>
                <DropdownItem key="select-all" onClick={onSelectAll}>
                  Select all ({totalItemCount} items)
                </DropdownItem>
              </DropdownList>
            </Dropdown>
          </ToolbarItem>
        )}

        {enableSelection && (
          <ToolbarItem>
            <Button
              variant="danger"
              icon={<TrashIcon />}
              isDisabled={!anySelected}
              onClick={onDeleteSelected}
            >
              Delete selected{anySelected ? ` (${selectedCount})` : ""}
            </Button>
          </ToolbarItem>
        )}

        {enablePagination && (
          <ToolbarItem variant="pagination" align={{ default: "alignEnd" }}>
            {renderPagination()}
          </ToolbarItem>
        )}
      </ToolbarContent>
    </Toolbar>
  );
}

export function CardView({
  items,
  title = "Projects",
  description = "This is a demo that showcases PatternFly cards.",
  showEmptyState = true,
  emptyStateAction,
  onCardSelect,
  onCardDelete,
  enableSelection = true,
  enablePagination = true,
  defaultPerPage = 10,
}: CardViewProps) {
  const [cardData, setCardData] = useState(items);
  const totalItemCount = cardData.length;
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [areAllSelected, setAreAllSelected] = useState<boolean>(false);
  const [splitButtonDropdownIsOpen, setSplitButtonDropdownIsOpen] =
    useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);

  useEffect(() => {
    if (cardData !== items) {
      setCardData(items);
      setSelectedItems([]);
      setAreAllSelected(false);
      setPage(1);
      setPerPage(defaultPerPage);
      setSplitButtonDropdownIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, defaultPerPage]);

  const checkAllSelected = (selected: number, total: number) => {
    if (total === 0) {
      return false;
    }
    if (selected && selected < total) {
      return null;
    }
    return selected === total;
  };

  const removeItems = (idsToRemove: (string | number)[]) => {
    const idSet = new Set(idsToRemove.map((id) => String(id)));

    if (idSet.size === 0) {
      return;
    }

    const removedItems = cardData.filter((card) => idSet.has(String(card.id)));

    if (removedItems.length === 0) {
      return;
    }

    const remainingItems = cardData.filter(
      (card) => !idSet.has(String(card.id))
    );

    setCardData(remainingItems);

    const updatedSelection = selectedItems.filter(
      (id) => !idSet.has(String(id))
    );
    setSelectedItems(updatedSelection);
    onCardSelect?.(updatedSelection);

    const allSelectedState = checkAllSelected(
      updatedSelection.length,
      remainingItems.length
    );
    setAreAllSelected(!!allSelectedState);

    setPage((currentPage) => {
      if (remainingItems.length === 0) {
        return 1;
      }
      const maxPage = Math.ceil(remainingItems.length / perPage);
      return Math.min(currentPage, maxPage);
    });

    if (onCardDelete) {
      removedItems.forEach((item) => onCardDelete(item));
    }
  };

  const deleteSelected = () => {
    removeItems(selectedItems);
  };

  const onSetPage = (_event: unknown, pageNumber: number) => {
    setPage(pageNumber);
  };

  const onPerPageSelect = (_event: unknown, perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const itemId = name.replace("check-", "");

    if (selectedItems.includes(itemId)) {
      const updated = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updated);
      onCardSelect?.(updated);
      const checkAll = checkAllSelected(updated.length, totalItemCount);
      setAreAllSelected(!!checkAll);
    } else {
      const updated = [...selectedItems, itemId];
      setSelectedItems(updated);
      onCardSelect?.(updated);
      const checkAll = checkAllSelected(updated.length, totalItemCount);
      setAreAllSelected(!!checkAll);
    }
  };

  const getAllItems = () => {
    return cardData.map((card) => String(card.id));
  };

  const selectAllToggle = () => {
    if (areAllSelected) {
      setSelectedItems([]);
      setAreAllSelected(false);
      onCardSelect?.([]);
    } else {
      const collection = getAllItems();
      setSelectedItems(collection);
      setAreAllSelected(collection.length > 0);
      onCardSelect?.(collection);
    }
  };

  const selectPage = () => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const collection = cardData
      .slice(start, end)
      .map((card) => String(card.id));

    setSelectedItems(collection);
    const isAllSelected =
      collection.length === totalItemCount && totalItemCount > 0;
    setAreAllSelected(isAllSelected);
    onCardSelect?.(collection);
  };

  const selectAll = () => {
    const collection = getAllItems();
    setSelectedItems(collection);
    setAreAllSelected(collection.length > 0);
    onCardSelect?.(collection);
  };

  const selectNone = () => {
    setSelectedItems([]);
    setAreAllSelected(false);
    onCardSelect?.([]);
  };

  const renderPagination = () => {
    const defaultPerPageOptions = [
      { title: "5", value: 5 },
      { title: "10", value: 10 },
      { title: "20", value: 20 },
    ];

    return (
      <Pagination
        itemCount={totalItemCount}
        page={page}
        perPage={perPage}
        perPageOptions={defaultPerPageOptions}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        variant="top"
        isCompact
      />
    );
  };

  const filtered = cardData;

  // Apply pagination
  const paginated =
    enablePagination && filtered.length > perPage
      ? filtered.slice((page - 1) * perPage, page * perPage)
      : filtered;

  return (
    <Fragment>
      <PageSection aria-labelledby="card-view-title">
        <Content>
          <h1 id="card-view-title">{title}</h1>
          <p>{description}</p>
        </Content>
      </PageSection>

      <PageSection isFilled aria-label="Selectable card gallery">
        <CardViewToolbar
          selectedCount={selectedItems.length}
          areAllSelected={areAllSelected}
          enableSelection={enableSelection}
          enablePagination={enablePagination}
          perPage={perPage}
          totalItemCount={totalItemCount}
          isSelectDropdownOpen={splitButtonDropdownIsOpen}
          onToggleSelectDropdown={() =>
            setSplitButtonDropdownIsOpen((prev) => !prev)
          }
          onSelectDropdownOpenChange={(isOpen) =>
            setSplitButtonDropdownIsOpen(isOpen)
          }
          onSelectToggle={selectAllToggle}
          onSelectNone={selectNone}
          onSelectPage={selectPage}
          onSelectAll={selectAll}
          onDeleteSelected={deleteSelected}
          renderPagination={renderPagination}
        />
        <Gallery hasGutter aria-label="Selectable card container">
          {paginated.length === 0 && showEmptyState ? (
            <Card isCompact>
              <Bullseye>
                <EmptyState
                  headingLevel="h2"
                  titleText="No cards found"
                  icon={PlusCircleIcon}
                  variant={EmptyStateVariant.xs}
                >
                  <EmptyStateFooter>
                    <EmptyStateActions>
                      {emptyStateAction && (
                        <Button variant="link" onClick={emptyStateAction}>
                          Add card
                        </Button>
                      )}
                    </EmptyStateActions>
                  </EmptyStateFooter>
                </EmptyState>
              </Bullseye>
            </Card>
          ) : (
            paginated.map((product) => (
              <Card
                isCompact
                isClickable
                isSelectable={enableSelection}
                key={product.id}
                id={String(product.id)}
              >
                <CardHeader
                  selectableActions={
                    enableSelection
                      ? {
                          isChecked: selectedItems.includes(String(product.id)),
                          selectableActionId: `selectable-actions-item-${product.id}`,
                          selectableActionAriaLabelledby: product.title.replace(
                            / /g,
                            "-"
                          ),
                          name: `check-${product.id}`,
                          onChange,
                        }
                      : undefined
                  }
                >
                  {product.icon && icons[product.icon] && (
                    <Icon>{React.createElement(icons[product.icon])}</Icon>
                  )}
                  {!product.icon && product.image && (
                    <Image
                      src={product.image}
                      alt={`${product.title} icon`}
                      width={60}
                      height={60}
                      style={{ maxWidth: "60px", height: "auto" }}
                    />
                  )}
                </CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardBody>{product.description || product.content}</CardBody>
              </Card>
            ))
          )}
        </Gallery>
      </PageSection>

      {enablePagination && filtered.length > perPage && (
        <PageSection
          isFilled={false}
          stickyOnBreakpoint={{ default: "bottom" }}
          padding={{ default: "noPadding" }}
          aria-label="Pagination controls"
        >
          <Pagination
            itemCount={filtered.length}
            page={page}
            perPage={perPage}
            onPerPageSelect={onPerPageSelect}
            onSetPage={onSetPage}
            variant="bottom"
          />
        </PageSection>
      )}
    </Fragment>
  );
}
