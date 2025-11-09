"use client";

import { useState, useEffect, Fragment } from "react";
import {
  PageSection,
  Title,
  Content,
  Divider,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Bullseye,
  EmptyState,
  Title as EmptyStateTitle,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarToggleGroup,
  ToolbarGroup,
  InputGroup,
  InputGroupItem,
  TextInput,
  Button,
  ButtonVariant,
  Select,
  SelectOption,
  MenuToggle,
  MenuToggleElement,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import FilterIcon from "@patternfly/react-icons/dist/esm/icons/filter-icon";
import type { PrimaryItem } from "@/lib/data/types";

export interface PrimaryDetailViewProps {
  masterItems: PrimaryItem[];
  renderDetail: (item: PrimaryItem) => React.ReactNode;
  title?: string;
  emptyStateMessage?: string;
  masterTitle?: string;
  detailTitle?: string;
  enableSearch?: boolean;
  enableFilters?: boolean;
  filterOptions?: Record<string, Array<{ value: string; label: string }>>;
}

export function PrimaryDetailView({
  masterItems,
  renderDetail,
  title = "Primary Detail",
  emptyStateMessage = "Select an item to view details",
  masterTitle = "Items",
  detailTitle = "Details",
  enableSearch = true,
  enableFilters = false,
  filterOptions = {},
}: PrimaryDetailViewProps) {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  const [selectedDataListItemId, setSelectedDataListItemId] = useState<
    string | number | ""
  >("");
  const [inputValue, setInputValue] = useState("");
  const [filterStates, setFilterStates] = useState<
    Record<string, { isOpen: boolean; selected: string | number | undefined }>
  >(
    Object.keys(filterOptions).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { isOpen: false, selected: key },
      }),
      {}
    )
  );

  // Sync drawer state when masterItems changes
  useEffect(() => {
    if (masterItems.length === 0) {
      setIsDrawerExpanded(false);
      setSelectedDataListItemId("");
    }
  }, [masterItems]);

  const onSelectDataListItem = (
    _event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>,
    id: string | number
  ) => {
    setSelectedDataListItemId(id);
    setIsDrawerExpanded(true);
  };

  const onCloseDrawerClick = () => {
    setIsDrawerExpanded(false);
    setSelectedDataListItemId("");
  };

  const onFilterSelect = (
    filterKey: string,
    _event: React.MouseEvent<Element> | undefined,
    value: string | number | undefined
  ) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        selected: value,
        isOpen: false,
      },
    }));
  };

  const selectedItem =
    masterItems.find(
      (item) => String(item.id) === String(selectedDataListItemId)
    ) || null;

  // Filter items based on search and filters
  let filteredItems = masterItems;
  if (inputValue) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const toggleGroupItems = (
    <Flex alignItems={{ default: "alignItemsCenter" }}>
      {enableSearch && (
        <ToolbarItem>
          <InputGroup>
            <InputGroupItem isFill>
              <TextInput
                name="primary-detail-search"
                id="primary-detail-search"
                type="search"
                aria-label="search input"
                onChange={(_event, value: string) => setInputValue(value)}
                value={inputValue}
              />
            </InputGroupItem>
            <InputGroupItem>
              <Button
                variant={ButtonVariant.control}
                aria-label="search button"
                icon={<SearchIcon />}
              />
            </InputGroupItem>
          </InputGroup>
        </ToolbarItem>
      )}
      {enableFilters && Object.keys(filterOptions).length > 0 && (
        <ToolbarGroup variant="filter-group">
          {Object.entries(filterOptions).map(([filterKey, options]) => (
            <ToolbarItem key={filterKey}>
              <Select
                aria-label={`${filterKey} select`}
                selected={filterStates[filterKey]?.selected}
                isOpen={filterStates[filterKey]?.isOpen || false}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() =>
                      setFilterStates((prev) => ({
                        ...prev,
                        [filterKey]: {
                          ...prev[filterKey],
                          isOpen: !prev[filterKey].isOpen,
                        },
                      }))
                    }
                    isExpanded={filterStates[filterKey]?.isOpen || false}
                  >
                    {filterStates[filterKey]?.selected || filterKey}
                  </MenuToggle>
                )}
                onOpenChange={(isOpen: boolean) =>
                  setFilterStates((prev) => ({
                    ...prev,
                    [filterKey]: { ...prev[filterKey], isOpen },
                  }))
                }
                onSelect={(event, value) =>
                  onFilterSelect(filterKey, event, value)
                }
              >
                {options.map(({ label, value }) => (
                  <SelectOption key={label} value={value}>
                    {label}
                  </SelectOption>
                ))}
              </Select>
            </ToolbarItem>
          ))}
        </ToolbarGroup>
      )}
    </Flex>
  );

  const toolbarItems = (
    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
      {toggleGroupItems}
    </ToolbarToggleGroup>
  );

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <Title headingLevel="h2" size="xl">
          {selectedItem ? selectedItem.title : detailTitle}
        </Title>
        <DrawerActions>
          <DrawerCloseButton onClick={onCloseDrawerClick} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        {selectedItem ? (
          <Flex
            spaceItems={{ default: "spaceItemsLg" }}
            direction={{ default: "column" }}
          >
            <FlexItem>
              {typeof renderDetail === "function" ? (
                renderDetail(selectedItem)
              ) : (
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Title</DescriptionListTerm>
                    <DescriptionListDescription>
                      {selectedItem.title}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  {selectedItem.description && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Description</DescriptionListTerm>
                      <DescriptionListDescription>
                        {selectedItem.description}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {selectedItem.meta &&
                    Object.entries(selectedItem.meta).map(([key, value]) => (
                      <DescriptionListGroup key={key}>
                        <DescriptionListTerm>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {String(value)}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    ))}
                </DescriptionList>
              )}
            </FlexItem>
          </Flex>
        ) : (
          <Bullseye>
            <EmptyState>
              <EmptyStateTitle headingLevel="h2">
                {emptyStateMessage}
              </EmptyStateTitle>
              <p>Select an item from the list to view its details.</p>
            </EmptyState>
          </Bullseye>
        )}
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  const drawerContent = (
    <Fragment>
      {(enableSearch || enableFilters) && (
        <Toolbar id="primary-detail-toolbar">
          <ToolbarContent>{toolbarItems}</ToolbarContent>
        </Toolbar>
      )}
      {filteredItems.length === 0 ? (
        <Bullseye>
          <EmptyState>
            <EmptyStateTitle headingLevel="h2">No items found</EmptyStateTitle>
            <p>
              {inputValue
                ? "Try adjusting your search or filter criteria."
                : "No items available to display."}
            </p>
          </EmptyState>
        </Bullseye>
      ) : (
        <DataList
          aria-label="primary detail data list"
          selectedDataListItemId={String(selectedDataListItemId)}
          onSelectDataListItem={onSelectDataListItem}
        >
          {filteredItems.map((item) => (
            <DataListItem key={item.id} id={String(item.id)}>
              <DataListItemRow>
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="primary-content">
                      <Flex
                        spaceItems={{ default: "spaceItemsMd" }}
                        direction={{ default: "column" }}
                      >
                        <FlexItem>
                          <p style={{ fontWeight: "bold", margin: 0 }}>
                            {item.title}
                          </p>
                          {item.description && (
                            <small
                              style={{
                                color: "var(--pf-v5-global--Color--200)",
                              }}
                            >
                              {item.description}
                            </small>
                          )}
                        </FlexItem>
                        {item.meta && Object.keys(item.meta).length > 0 && (
                          <Flex spaceItems={{ default: "spaceItemsMd" }}>
                            {Object.entries(item.meta).map(([key, value]) => (
                              <FlexItem key={key}>
                                <strong>{key}:</strong> {String(value)}
                              </FlexItem>
                            ))}
                          </Flex>
                        )}
                      </Flex>
                    </DataListCell>,
                  ]}
                />
              </DataListItemRow>
            </DataListItem>
          ))}
        </DataList>
      )}
    </Fragment>
  );

  return (
    <>
      {title && (
        <PageSection aria-labelledby="primary-detail-title">
          <Content>
            <Title headingLevel="h1" id="primary-detail-title">
              {title}
            </Title>
            <p>
              Select an item from the list to view its details in the drawer
              panel.
            </p>
          </Content>
        </PageSection>
      )}
      <Divider component="div" />
      <PageSection
        padding={{ default: "noPadding" }}
        aria-label="Primary detail with drawer"
      >
        <Drawer isExpanded={isDrawerExpanded}>
          <DrawerContent panelContent={panelContent}>
            <DrawerContentBody>{drawerContent}</DrawerContentBody>
          </DrawerContent>
        </Drawer>
      </PageSection>
    </>
  );
}
