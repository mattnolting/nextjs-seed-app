"use client";

import { Fragment, useState } from "react";
import {
  Badge,
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
  OverflowMenu,
  OverflowMenuControl,
  OverflowMenuDropdownItem,
  OverflowMenuItem,
  PageSection,
  Pagination,
  Toolbar,
  ToolbarItem,
  ToolbarFilter,
  ToolbarContent,
  Select,
  SelectList,
  SelectOption,
  MenuToggleElement,
} from "@patternfly/react-core";
import TrashIcon from "@patternfly/react-icons/dist/esm/icons/trash-icon";
import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

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
  filterCategories?: Record<string, string[]>;
  enableSelection?: boolean;
  enablePagination?: boolean;
  defaultPerPage?: number;
}

export function CardView({
  items,
  title = "Projects",
  description = "This is a demo that showcases PatternFly cards.",
  showEmptyState = true,
  emptyStateAction,
  onCardSelect,
  onCardDelete,
  filterCategories,
  enableSelection = true,
  enablePagination = true,
  defaultPerPage = 10,
}: CardViewProps) {
  const totalItemCount = items.length;
  const [cardData, setCardData] = useState(items);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [areAllSelected, setAreAllSelected] = useState<boolean>(false);
  const [splitButtonDropdownIsOpen, setSplitButtonDropdownIsOpen] =
    useState(false);
  const [isLowerToolbarDropdownOpen, setIsLowerToolbarDropdownOpen] =
    useState(false);
  const [isLowerToolbarKebabDropdownOpen, setIsLowerToolbarKebabDropdownOpen] =
    useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [filters, setFilters] = useState<Record<string, string[]>>(
    filterCategories
      ? Object.fromEntries(
          Object.keys(filterCategories).map((key) => [key, []])
        )
      : {}
  );
  const [cardActionsState, setCardActionsState] = useState<
    Record<string, boolean>
  >({});

  const checkAllSelected = (selected: number, total: number) => {
    if (selected && selected < total) {
      return null;
    }
    return selected === total;
  };

  const onToolbarDropdownToggle = () => {
    setIsLowerToolbarDropdownOpen(!isLowerToolbarDropdownOpen);
  };

  const onToolbarKebabDropdownToggle = () => {
    setIsLowerToolbarKebabDropdownOpen(!isLowerToolbarKebabDropdownOpen);
  };

  const onToolbarKebabDropdownSelect = () => {
    setIsLowerToolbarKebabDropdownOpen(!isLowerToolbarKebabDropdownOpen);
  };

  const onCardKebabDropdownToggle = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    setCardActionsState({
      [key]: !cardActionsState[key],
    });
  };

  const deleteItem = (item: CardItem) => {
    const filtered = cardData.filter((card) => card.id !== item.id);
    setCardData(filtered);
    setSelectedItems(selectedItems.filter((id) => id !== item.id));
    onCardDelete?.(item);
  };

  const onSetPage = (_event: unknown, pageNumber: number) => {
    setPage(pageNumber);
  };

  const onPerPageSelect = (_event: unknown, perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  const onSplitButtonToggle = () => {
    setSplitButtonDropdownIsOpen(!splitButtonDropdownIsOpen);
  };

  const onSplitButtonSelect = () => {
    setSplitButtonDropdownIsOpen(false);
  };

  const onFilterSelect = (
    event: React.FormEvent<HTMLInputElement> | React.MouseEvent<Element>,
    selection = "",
    category: string
  ) => {
    const checked = (event.target as HTMLInputElement)?.checked ?? false;
    const prevSelections = filters[category] || [];

    setFilters({
      ...filters,
      [category]: checked
        ? [...prevSelections, selection]
        : prevSelections.filter((value) => value !== selection),
    });
  };

  const onDelete = (category?: string) => {
    if (category) {
      setFilters({
        ...filters,
        [category]: [],
      });
    } else {
      const cleared = Object.fromEntries(
        Object.keys(filters).map((key) => [key, []])
      );
      setFilters(cleared);
    }
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
    return cardData.map((card) => card.id);
  };

  const splitCheckboxSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    let collection: (string | number)[] = [];

    if (e.target.checked) {
      collection = getAllItems();
    }

    setSelectedItems(collection);
    setAreAllSelected(e.target.checked);
    onCardSelect?.(collection);
  };

  const selectPage = () => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const collection = cardData.slice(start, end).map((card) => card.id);

    setSelectedItems(collection);
    setAreAllSelected(totalItemCount === perPage);
    onCardSelect?.(collection);
  };

  const selectAll = () => {
    const collection = getAllItems();
    setSelectedItems(collection);
    setAreAllSelected(true);
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

  const buildSelectDropdown = () => {
    const numSelected = selectedItems.length;
    const anySelected = numSelected > 0;
    const splitButtonDropdownItems = (
      <>
        <DropdownItem key="item-1" onClick={selectNone}>
          Select none (0 items)
        </DropdownItem>
        <DropdownItem key="item-2" onClick={selectPage}>
          Select page ({Math.min(perPage, totalItemCount)} items)
        </DropdownItem>
        <DropdownItem key="item-3" onClick={selectAll}>
          Select all ({totalItemCount} items)
        </DropdownItem>
      </>
    );
    return (
      <Dropdown
        onSelect={onSplitButtonSelect}
        isOpen={splitButtonDropdownIsOpen}
        onOpenChange={(isOpen) => setSplitButtonDropdownIsOpen(isOpen)}
        toggle={(toggleRef) => (
          <MenuToggle
            ref={toggleRef}
            isExpanded={splitButtonDropdownIsOpen}
            onClick={onSplitButtonToggle}
            aria-label="Select cards"
            splitButtonItems={[
              <MenuToggleCheckbox
                id="split-dropdown-checkbox"
                key="split-dropdown-checkbox"
                aria-label={
                  anySelected ? "Deselect all cards" : "Select all cards"
                }
                isChecked={areAllSelected}
                onClick={(e) =>
                  splitCheckboxSelectAll(
                    e as unknown as React.ChangeEvent<HTMLInputElement>
                  )
                }
              >
                {numSelected !== 0 && `${numSelected} selected`}
              </MenuToggleCheckbox>,
            ]}
          ></MenuToggle>
        )}
      >
        <DropdownList>{splitButtonDropdownItems}</DropdownList>
      </Dropdown>
    );
  };

  const buildFilterDropdown = (category: string, options: string[]) => {
    const filterDropdownItems = (
      <SelectList>
        {options.map((option) => (
          <SelectOption
            hasCheckbox
            key={option}
            value={option}
            isSelected={filters[category]?.includes(option)}
          >
            {option}
          </SelectOption>
        ))}
      </SelectList>
    );

    return (
      <ToolbarFilter
        categoryName={category}
        labels={filters[category] || []}
        deleteLabel={(type) => onDelete(type as string)}
      >
        <Select
          aria-label={category}
          role="menu"
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              onClick={onToolbarDropdownToggle}
              isExpanded={isLowerToolbarDropdownOpen}
            >
              Filter by {category.toLowerCase()}
              {filters[category]?.length > 0 && (
                <Badge isRead>{filters[category].length}</Badge>
              )}
            </MenuToggle>
          )}
          onSelect={(event, selection) =>
            onFilterSelect(
              event as unknown as React.FormEvent<HTMLInputElement>,
              selection?.toString() || "",
              category
            )
          }
          onOpenChange={(isOpen) => {
            setIsLowerToolbarDropdownOpen(isOpen);
          }}
          selected={filters[category] || []}
          isOpen={isLowerToolbarDropdownOpen}
        >
          {filterDropdownItems}
        </Select>
      </ToolbarFilter>
    );
  };

  const toolbarKebabDropdownItems = [
    <OverflowMenuDropdownItem itemId={0} key="link">
      Link
    </OverflowMenuDropdownItem>,
    <OverflowMenuDropdownItem itemId={1} key="action" component="button">
      Action
    </OverflowMenuDropdownItem>,
  ];

  const toolbarItems = (
    <Fragment>
      {enableSelection && <ToolbarItem>{buildSelectDropdown()}</ToolbarItem>}
      {filterCategories &&
        Object.entries(filterCategories).map(([category, options]) => (
          <ToolbarItem key={category}>
            {buildFilterDropdown(category, options)}
          </ToolbarItem>
        ))}
      <ToolbarItem>
        <OverflowMenu breakpoint="md">
          <OverflowMenuItem>
            <Button variant="primary">Create</Button>
          </OverflowMenuItem>
          <OverflowMenuControl hasAdditionalOptions>
            <Dropdown
              onSelect={onToolbarKebabDropdownSelect}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  aria-label="Toolbar kebab overflow menu"
                  variant="plain"
                  onClick={onToolbarKebabDropdownToggle}
                  isExpanded={isLowerToolbarKebabDropdownOpen}
                  icon={<EllipsisVIcon />}
                />
              )}
              isOpen={isLowerToolbarKebabDropdownOpen}
              onOpenChange={(isOpen) =>
                setIsLowerToolbarKebabDropdownOpen(isOpen)
              }
            >
              <DropdownList>{toolbarKebabDropdownItems}</DropdownList>
            </Dropdown>
          </OverflowMenuControl>
        </OverflowMenu>
      </ToolbarItem>
      {enablePagination && (
        <ToolbarItem variant="pagination" align={{ default: "alignEnd" }}>
          {renderPagination()}
        </ToolbarItem>
      )}
    </Fragment>
  );

  // Apply filters
  let filtered = cardData;
  if (filterCategories) {
    Object.entries(filters).forEach(([category, selected]) => {
      if (selected.length > 0) {
        filtered = filtered.filter((card) => {
          const value = card.meta?.[category] || card.title;
          return selected.includes(value);
        });
      }
    });
  }

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
        <Toolbar id="toolbar-group-types" clearAllFilters={onDelete}>
          <ToolbarContent>{toolbarItems}</ToolbarContent>
        </Toolbar>
        <Gallery hasGutter aria-label="Selectable card container">
          {showEmptyState && (
            <Card isCompact>
              <Bullseye>
                <EmptyState
                  headingLevel="h2"
                  titleText="Add a new card to your page"
                  icon={PlusCircleIcon}
                  variant={EmptyStateVariant.xs}
                >
                  <EmptyStateFooter>
                    <EmptyStateActions>
                      <Button variant="link" onClick={emptyStateAction}>
                        Add card
                      </Button>
                    </EmptyStateActions>
                  </EmptyStateFooter>
                </EmptyState>
              </Bullseye>
            </Card>
          )}
          {paginated.map((product, key) => (
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
                        isChecked: selectedItems.includes(product.id),
                        selectableActionId: `selectable-actions-item-${product.id}`,
                        selectableActionAriaLabelledby: String(product.id),
                        name: `check-${product.id}`,
                        onChange,
                      }
                    : undefined
                }
                actions={{
                  actions: (
                    <Dropdown
                      isOpen={!!cardActionsState[key]}
                      onOpenChange={(isOpen) =>
                        setCardActionsState({ [key]: isOpen })
                      }
                      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                        <MenuToggle
                          ref={toggleRef}
                          aria-label={`${product.title} actions`}
                          variant="plain"
                          onClick={(e) => {
                            onCardKebabDropdownToggle(e, key.toString());
                          }}
                          isExpanded={!!cardActionsState[key]}
                          icon={<EllipsisVIcon />}
                        />
                      )}
                      popperProps={{ position: "right" }}
                    >
                      <DropdownList>
                        {onCardDelete && (
                          <DropdownItem
                            key="trash"
                            onClick={() => {
                              deleteItem(product);
                            }}
                          >
                            <TrashIcon /> Delete
                          </DropdownItem>
                        )}
                      </DropdownList>
                    </Dropdown>
                  ),
                }}
              >
                {product.image && (
                  <div style={{ maxWidth: "60px", display: "inline-block" }}>
                    <img
                      src={product.image}
                      alt={`${product.title} icon`}
                      style={{
                        maxWidth: "60px",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                )}
                {product.icon && !product.image && <span>{product.icon}</span>}
              </CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardBody>{product.description || product.content}</CardBody>
            </Card>
          ))}
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
