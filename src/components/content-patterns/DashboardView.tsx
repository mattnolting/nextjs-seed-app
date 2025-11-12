"use client";

/**
 * SAMPLE CONTENT PATTERN
 * ----------------------
 * A comprehensive PatternFly dashboard showcase (cards, charts, lists, etc.).
 * Intended purely as demonstration code—trim or replace it with the views your
 * product needs when customizing the starter.
 */

import { ReactNode, useRef, useState, useEffect } from "react";
import {
  PageSection,
  Gallery,
  GalleryItem,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  CardExpandableContent,
  Dropdown,
  DropdownList,
  DropdownItem,
  Divider,
  MenuToggle,
  Title,
  Grid,
  GridItem,
  Content,
  Level,
  LabelGroup,
  Label,
  Flex,
  FlexItem,
  List,
  ListItem,
  Button,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Select,
  SelectList,
  SelectOption,
  Icon,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import type { LabelProps } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import InfoCircleIcon from "@patternfly/react-icons/dist/esm/icons/info-circle-icon";
import ArrowRightIcon from "@patternfly/react-icons/dist/esm/icons/arrow-right-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import type { MenuToggleElement } from "@patternfly/react-core";
import {
  ChartBar,
  ChartThemeColor,
  ChartDonutThreshold,
  ChartDonutUtilization,
  Chart,
  ChartStack,
  ChartTooltip,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartLegendTooltip,
  createContainer,
} from "@patternfly/react-charts";
import chart_color_yellow_100 from "@patternfly/react-tokens/dist/esm/chart_color_yellow_100";
import chart_color_yellow_300 from "@patternfly/react-tokens/dist/esm/chart_color_yellow_300";
import chart_color_orange_300 from "@patternfly/react-tokens/dist/esm/chart_color_orange_300";
import chart_color_red_orange_400 from "@patternfly/react-tokens/dist/esm/chart_color_red_orange_400";
import type { KPICard } from "@/lib/data/types";

// Horizontal Grid Card Component (PatternFly Card Horizontal Grid pattern)
function KPICardHorizontalGrid({ kpi }: { kpi: KPICard }) {
  const [isCardExpanded, setIsCardExpanded] = useState(
    kpi.horizontalGrid?.defaultExpanded ?? false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onCardExpand = () => {
    setIsCardExpanded(!isCardExpanded);
  };

  const onActionToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onActionSelect = () => {
    setIsDropdownOpen(false);
  };

  const dropdownItems = (
    <>
      <DropdownItem key="action1">Action 1</DropdownItem>
      <DropdownItem key="action2">Action 2</DropdownItem>
      <DropdownItem key="disabled action3" isDisabled>
        Disabled Action 3
      </DropdownItem>
      <DropdownItem key="action4">Action 4</DropdownItem>
    </>
  );

  const headerActions = (
    <Dropdown
      onSelect={onActionSelect}
      isOpen={isDropdownOpen}
      popperProps={{ position: "right" }}
      onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          isExpanded={isDropdownOpen}
          onClick={onActionToggle}
          variant="plain"
          aria-label={`${kpi.title} actions`}
          icon={<EllipsisVIcon />}
        />
      )}
    >
      <DropdownList>{dropdownItems}</DropdownList>
    </Dropdown>
  );

  const gridItems = kpi.horizontalGrid?.gridItems || [];

  return (
    <Card id={`horizontal-card-${kpi.id}`} isExpanded={isCardExpanded}>
      <CardHeader
        actions={{ actions: headerActions }}
        onExpand={onCardExpand}
        toggleButtonProps={{
          id: `toggle-button-${kpi.id}`,
          "aria-label": "Actions",
          "aria-labelledby": `titleId-${kpi.id} toggle-button-${kpi.id}`,
          "aria-expanded": isCardExpanded,
        }}
      >
        {isCardExpanded && (
          <CardTitle id={`titleId-${kpi.id}`}>{kpi.title}</CardTitle>
        )}
        {!isCardExpanded && (
          <Level hasGutter>
            <CardTitle id={`titleId-${kpi.id}`}>{kpi.title}</CardTitle>
            {kpi.horizontalGrid?.labels &&
              kpi.horizontalGrid.labels.length > 0 && (
                <LabelGroup isCompact>
                  {kpi.horizontalGrid.labels.map((label, idx) => {
                    const labelColor = label.color as LabelProps["color"];
                    return (
                      <Label
                        key={idx}
                        isCompact
                        icon={label.icon ? <InfoCircleIcon /> : undefined}
                        color={labelColor}
                      >
                        {label.text}
                      </Label>
                    );
                  })}
                </LabelGroup>
              )}
          </Level>
        )}
      </CardHeader>
      <CardExpandableContent>
        <CardBody>
          <Grid md={6} xl={4} hasGutter>
            {gridItems.map((item, idx) => (
              <Flex
                key={idx}
                spaceItems={{ default: "spaceItemsLg" }}
                alignItems={{ default: "alignItemsFlexStart" }}
                direction={{ default: "column" }}
              >
                <Flex
                  spaceItems={{ default: "spaceItemsSm" }}
                  alignItems={{ default: "alignItemsFlexStart" }}
                  direction={{ default: "column" }}
                  grow={{ default: "grow" }}
                >
                  <Label
                    icon={item.label.icon ? <InfoCircleIcon /> : undefined}
                    color={item.label.color as LabelProps["color"]}
                  >
                    {item.label.text}
                  </Label>
                  <p>{item.description}</p>
                  <List isPlain>
                    {item.links.map((link, linkIdx) => (
                      <ListItem key={linkIdx}>
                        <a href={link.href}>
                          {link.text}
                          {link.external && <ExternalLinkAltIcon />}
                        </a>
                      </ListItem>
                    ))}
                  </List>
                </Flex>
                <Button
                  href={item.viewAllLink.href}
                  component="a"
                  variant="link"
                  isInline
                  icon={<ArrowRightIcon />}
                  iconPosition="right"
                >
                  {item.viewAllLink.text}
                </Button>
              </Flex>
            ))}
          </Grid>
        </CardBody>
      </CardExpandableContent>
    </Card>
  );
}

// Utilization Card Component (PatternFly ChartDonutUtilization pattern)
function KPIUtilizationChart({ kpi }: { kpi: KPICard }) {
  const utilization = kpi.utilization;
  if (!utilization || !utilization.enabled) return null;

  const value = utilization.value || 0;
  const total = utilization.total || "";
  const thresholds = utilization.thresholds || [
    { label: "Warning at 60%", value: 60 },
    { label: "Danger at 90%", value: 90 },
  ];

  return (
    <ChartDonutThreshold
      ariaDesc={utilization.ariaDesc || "Storage capacity"}
      ariaTitle={utilization.ariaTitle || "Donut utilization chart"}
      constrainToVisibleArea={true}
      data={thresholds.map((t) => ({ x: t.label, y: t.value }))}
      height={200}
      labels={({ datum }) => (datum.x ? datum.x : null)}
      padding={{
        bottom: 0,
        left: 10,
        right: 150,
        top: 0,
      }}
      width={350}
    >
      <ChartDonutUtilization
        data={{ x: "Storage capacity", y: value }}
        labels={({ datum }) => (datum.x ? `${datum.x}: ${datum.y}%` : null)}
        legendData={[
          { name: `Capacity: ${value}%` },
          ...thresholds.map((t) => ({ name: t.label })),
        ]}
        legendOrientation="vertical"
        title={`${value}%`}
        subTitle={total ? `of ${total}` : undefined}
        thresholds={thresholds.map((t) => ({ value: t.value }))}
      />
    </ChartDonutThreshold>
  );
}

// Recommendations Card Component (PatternFly ChartStack pattern)
function KPICardRecommendations({ kpi }: { kpi: KPICard }) {
  const [isOpen, setIsOpen] = useState(false);
  const recommendations = kpi.recommendations;
  if (!recommendations || !recommendations.enabled) return null;
  const filterOptions = recommendations.filterOptions || [];

  const selectItems = (
    <SelectList>
      {filterOptions.map((option) => (
        <SelectOption key={option.key} value={option.value}>
          {option.value}
        </SelectOption>
      ))}
    </SelectList>
  );

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={() => setIsOpen(!isOpen)}
      isExpanded={isOpen}
      variant="plainText"
    >
      Filter
    </MenuToggle>
  );

  const headerActions =
    filterOptions.length > 0 ? (
      <Select
        onSelect={() => setIsOpen(!isOpen)}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
        toggle={toggle}
      >
        {selectItems}
      </Select>
    ) : undefined;

  return (
    <Card isFullHeight id={`recommendations-card-${kpi.id}`} component="div">
      <CardHeader
        actions={
          headerActions
            ? { actions: headerActions, hasNoOffset: true }
            : undefined
        }
      >
        <CardTitle>
          {recommendations.title || kpi.title || "Recommendations"}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Flex direction={{ default: "column" }}>
          {recommendations.systemLabel && (
            <FlexItem>
              <span>{recommendations.systemLabel}</span>
            </FlexItem>
          )}
          {recommendations.incidentCount !== undefined &&
            recommendations.incidentLink && (
              <Flex>
                <Icon status="danger">
                  <ExclamationCircleIcon />
                </Icon>
                <a href={recommendations.incidentLink.href}>
                  {recommendations.incidentCount}{" "}
                  {recommendations.incidentLink.text}
                </a>
              </Flex>
            )}
          <FlexItem>
            <Chart
              ariaDesc={recommendations.ariaDesc || "Incidents chart"}
              ariaTitle={recommendations.ariaTitle || "Stack chart"}
              domainPadding={{ x: [30, 25] }}
              legendData={[
                { name: "Low" },
                { name: "Important" },
                { name: "Moderate" },
                { name: "Critical" },
              ]}
              legendPosition="bottom-left"
              height={50}
              padding={{
                bottom: 40,
                left: 0,
                right: 0,
                top: 0,
              }}
              width={350}
              showAxis={false}
            >
              <ChartStack
                horizontal
                colorScale={[
                  chart_color_yellow_100.value,
                  chart_color_yellow_300.value,
                  chart_color_orange_300.value,
                  chart_color_red_orange_400.value,
                ]}
              >
                <ChartBar
                  data={[
                    {
                      name: "Low",
                      x: "Incidents",
                      y: 6,
                      label: "Low: 6",
                    },
                  ]}
                  labelComponent={<ChartTooltip constrainToVisibleArea />}
                />
                <ChartBar
                  data={[
                    {
                      name: "Important",
                      x: "Incidents",
                      y: 2,
                      label: "Important: 2",
                    },
                  ]}
                  labelComponent={<ChartTooltip constrainToVisibleArea />}
                />
                <ChartBar
                  data={[
                    {
                      name: "Moderate",
                      x: "Incidents",
                      y: 4,
                      label: "Moderate: 4",
                    },
                  ]}
                  labelComponent={<ChartTooltip constrainToVisibleArea />}
                />
                <ChartBar
                  data={[
                    {
                      name: "Critical",
                      x: "Incidents",
                      y: 2,
                      label: "Critical: 2",
                    },
                  ]}
                  labelComponent={<ChartTooltip constrainToVisibleArea />}
                />
              </ChartStack>
            </Chart>
          </FlexItem>
        </Flex>
      </CardBody>
      {recommendations.footerLink && (
        <CardFooter>
          <a href={recommendations.footerLink.href}>
            {recommendations.footerLink.text}
          </a>
        </CardFooter>
      )}
    </Card>
  );
}

// Details Card Component (PatternFly DescriptionList pattern)
function KPICardDetails({ kpi }: { kpi: KPICard }) {
  const details = kpi.details;
  if (!details || !details.enabled) return null;

  const items = details.items || [];

  return (
    <Card>
      <CardTitle>{details.title || kpi.title || "Details"}</CardTitle>
      <CardBody>
        <DescriptionList
          aria-label={details.ariaLabel || `${kpi.title} details`}
        >
          {items.map((item, idx) => (
            <DescriptionListGroup key={idx}>
              <DescriptionListTerm>{item.term}</DescriptionListTerm>
              <DescriptionListDescription>
                {item.isLink && item.href ? (
                  <a href={item.href}>{item.description}</a>
                ) : (
                  item.description
                )}
              </DescriptionListDescription>
            </DescriptionListGroup>
          ))}
        </DescriptionList>
      </CardBody>
      {details.footerLink && (
        <>
          <Divider />
          <CardFooter>
            <a href={details.footerLink.href}>{details.footerLink.text}</a>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
function getTrendLabelColor(direction?: string): LabelProps["color"] {
  if (direction === "up") {
    return "green";
  }

  if (direction === "down") {
    return "red";
  }

  return "grey";
}

function sanitizeSeriesId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function KPICardSummary({ kpi }: { kpi: KPICard }) {
  const trendColor = getTrendLabelColor(kpi.trendDirection);

  return (
    <Card isCompact isFullHeight>
      <CardHeader>
        <CardTitle>{kpi.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Stack hasGutter>
          <StackItem>{kpi.value}</StackItem>
          {kpi.trend && (
            <StackItem>
              <Label color={trendColor} isCompact>
                {kpi.trend}
              </Label>
            </StackItem>
          )}
          {kpi.description && (
            <StackItem>
              <p
                style={{
                  fontSize: "var(--pf-global--FontSize--sm)",
                  color: "var(--pf-global--Color--200)",
                  margin: 0,
                }}
              >
                {kpi.description}
              </p>
            </StackItem>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

const VoronoiCursorContainer = createContainer("voronoi", "cursor");

function useResponsiveChartWidth(initialWidth = 450, minWidth = 300) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (chartRef.current) {
        const containerWidth = chartRef.current.offsetWidth || initialWidth;
        setWidth(Math.max(containerWidth - 40, minWidth));
      }
    };
    requestAnimationFrame(updateWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [initialWidth, minWidth]);

  return { chartRef, width };
}

function CpuUsageByNodeChart() {
  const { chartRef, width } = useResponsiveChartWidth();

  const series = [
    {
      name: "Node A",
      data: [
        { name: "Node A", x: "08:00", y: 62 },
        { name: "Node A", x: "10:00", y: 64 },
        { name: "Node A", x: "12:00", y: 73 },
        { name: "Node A", x: "14:00", y: 68 },
      ],
    },
    {
      name: "Node B",
      data: [
        { name: "Node B", x: "08:00", y: 55 },
        { name: "Node B", x: "10:00", y: 58 },
        { name: "Node B", x: "12:00", y: 65 },
        { name: "Node B", x: "14:00", y: 63 },
      ],
    },
    {
      name: "Node C",
      data: [
        { name: "Node C", x: "08:00", y: 59 },
        { name: "Node C", x: "10:00", y: 61 },
        { name: "Node C", x: "12:00", y: 69 },
        { name: "Node C", x: "14:00", y: 66 },
      ],
    },
  ];

  const formattedSeries = series.map((seriesEntry) => ({
    name: seriesEntry.name,
    data: seriesEntry.data.map((datum) => ({
      ...datum,
      label: `${seriesEntry.name}: ${datum.y}`,
    })),
  }));

  const legendData = series.map((seriesEntry) => ({
    name: seriesEntry.name,
  }));

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      {width > 0 && (
        <Chart
          ariaDesc="CPU utilization by node over the last 4 hours"
          ariaTitle="CPU utilization by node"
          domainPadding={{ x: [30, 25] }}
          legendData={legendData}
          legendPosition="bottom"
          height={275}
          name="chart-cpu-by-node"
          padding={{ bottom: 75, left: 50, right: 50, top: 50 }}
          themeColor={ChartThemeColor.purple}
          width={width}
        >
          <ChartAxis />
          <ChartAxis dependentAxis showGrid />
          <ChartGroup offset={11}>
            {formattedSeries.map((seriesEntry) => (
              <ChartBar
                key={seriesEntry.name}
                data={seriesEntry.data}
                labelComponent={<ChartTooltip constrainToVisibleArea />}
              />
            ))}
          </ChartGroup>
        </Chart>
      )}
    </div>
  );
}

function ClusterCpuTrendChart() {
  const { chartRef, width } = useResponsiveChartWidth();

  const series = [
    {
      name: "Control plane",
      data: [
        { name: "Control plane", x: "00:00", y: 42 },
        { name: "Control plane", x: "06:00", y: 48 },
        { name: "Control plane", x: "12:00", y: 55 },
        { name: "Control plane", x: "18:00", y: 49 },
        { name: "Control plane", x: "24:00", y: 44 },
      ],
    },
    {
      name: "Workloads",
      data: [
        { name: "Workloads", x: "00:00", y: 58 },
        { name: "Workloads", x: "06:00", y: 64 },
        { name: "Workloads", x: "12:00", y: 72 },
        { name: "Workloads", x: "18:00", y: 68 },
        { name: "Workloads", x: "24:00", y: 60 },
      ],
    },
    {
      name: "Platform services",
      data: [
        { name: "Platform services", x: "00:00", y: 34 },
        { name: "Platform services", x: "06:00", y: 38 },
        { name: "Platform services", x: "12:00", y: 43 },
        { name: "Platform services", x: "18:00", y: 39 },
        { name: "Platform services", x: "24:00", y: 36 },
      ],
    },
  ];

  const formattedSeries = series.map((seriesEntry) => {
    const id = sanitizeSeriesId(seriesEntry.name);
    return {
      id,
      name: seriesEntry.name,
      data: seriesEntry.data,
    };
  });

  const legendData = formattedSeries.map((seriesEntry) => ({
    childName: seriesEntry.id,
    name: seriesEntry.name,
  }));

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      {width > 0 && (
        <Chart
          ariaDesc="Cluster CPU utilization trend over the last 24 hours"
          ariaTitle="Cluster CPU trend"
          containerComponent={
            <VoronoiCursorContainer
              cursorDimension="x"
              labels={({ datum }: { datum: { y: number } }) => `${datum.y}`}
              labelComponent={
                <ChartLegendTooltip
                  legendData={legendData}
                  title={(datum: { x: string }) => datum.x}
                />
              }
              mouseFollowTooltips
              voronoiDimension="x"
              voronoiPadding={50}
            />
          }
          legendData={legendData}
          legendPosition="bottom"
          height={275}
          name="chart-cluster-cpu-trend"
          padding={{ bottom: 75, left: 50, right: 50, top: 50 }}
          themeColor={ChartThemeColor.green}
          width={width}
        >
          <ChartAxis />
          <ChartAxis dependentAxis showGrid />
          <ChartGroup>
            {formattedSeries.map((seriesEntry) => (
              <ChartLine
                key={seriesEntry.id}
                data={seriesEntry.data}
                name={seriesEntry.id}
              />
            ))}
          </ChartGroup>
        </Chart>
      )}
    </div>
  );
}

const HORIZONTAL_GRID_CARD: KPICard = {
  id: "1",
  title: "Getting Started",
  horizontalGrid: {
    enabled: true,
    defaultExpanded: false,
    span: 12,
    labels: [
      { text: "Set up your cluster", color: "blue", icon: true },
      { text: "Guided tours", color: "purple", icon: true },
      { text: "Quick starts", color: "green", icon: true },
      { text: "Learning resources", color: "orange", icon: true },
    ],
    gridItems: [
      {
        label: { text: "Set up your cluster", color: "blue", icon: true },
        description:
          "Continue setting up your cluster to access all you can in the Console",
        links: [
          { text: "Add identity provider", href: "#" },
          { text: "Configure alert receivers", href: "#" },
          { text: "Configure default ingress certificate", href: "#" },
        ],
        viewAllLink: {
          text: "View all set up cluster steps",
          href: "#",
        },
      },
      {
        label: { text: "Guided tours", color: "purple", icon: true },
        description: "Tour some of the key features around the console",
        links: [
          { text: "Tour the console", href: "#" },
          { text: "Getting started with Serverless", href: "#" },
        ],
        viewAllLink: {
          text: "View all guided tours",
          href: "#",
        },
      },
      {
        label: { text: "Quick starts", color: "green", icon: true },
        description:
          "Get started with features using our step-by-step documentation",
        links: [
          { text: "Getting started with Serverless", href: "#" },
          { text: "Explore virtualization", href: "#" },
          { text: "Build pipelines", href: "#" },
        ],
        viewAllLink: {
          text: "View all quick starts",
          href: "#",
        },
      },
      {
        label: { text: "Learning resources", color: "orange", icon: true },
        description:
          "Learn about new features within the Console and get started with demo apps",
        links: [
          { text: "See what's possible with the Explore page", href: "#" },
          {
            text: "OpenShift 4.5: Top Tasks",
            href: "#",
            external: true,
          },
          { text: "Try a demo app", href: "#" },
        ],
        viewAllLink: {
          text: "View all learning resources",
          href: "#",
        },
      },
    ],
  },
};

const UTILIZATION_CARD: KPICard = {
  id: "2",
  title: "CPU Usage",
  utilization: {
    enabled: true,
    title: "CPU Usage",
    titleHeadingLevel: "h4",
    titleSize: "lg",
    value: 80,
    total: "100 GBps",
    thresholds: [
      { label: "Warning at 60%", value: 60 },
      { label: "Danger at 90%", value: 90 },
    ],
    footerLink: {
      text: "See details",
      href: "#",
    },
    ariaDesc: "Mock storage capacity",
    ariaTitle: "Mock donut utilization chart",
  },
};

const SUMMARY_CARD_ONE: KPICard = {
  id: "summary-1",
  title: "Memory",
  value: "68% used",
};

const SUMMARY_CARD_TWO: KPICard = {
  id: "summary-2",
  title: "Nodes",
  value: "8 healthy",
};

const SUMMARY_CARD_THREE: KPICard = {
  id: "summary-3",
  title: "Pods",
  value: "124 running",
};

const RECOMMENDATION_CARD: KPICard = {
  id: "3",
  title: "Recommendations",
  recommendations: {
    enabled: true,
    title: "Recommendations",
    titleHeadingLevel: "h4",
    titleSize: "lg",
    systemLabel: "System",
    incidentCount: 25,
    incidentLink: {
      text: "incidents detected",
      href: "#",
    },
    filterOptions: [
      { key: "option1", value: "Last hour" },
      { key: "option2", value: "Last 6 hours" },
      { key: "option3", value: "Last 24 hours" },
      { key: "option4", value: "Last 7 days" },
    ],
    footerLink: {
      text: "See details",
      href: "#",
    },
    ariaDesc: "Mock incidents chart",
    ariaTitle: "Mock stack chart",
  },
};

const DETAILS_CARD: KPICard = {
  id: "4",
  title: "Details",
  details: {
    enabled: true,
    title: "Details",
    titleHeadingLevel: "h4",
    titleSize: "xl",
    ariaLabel: "Cluster details for API1",
    span: 12,
    items: [
      {
        term: "Cluster API Address",
        description: "https://api1.devcluster.openshift.com",
        isLink: true,
        href: "#",
      },
      {
        term: "Cluster ID",
        description: "63b97ac1-b850-41d9-8820-239becde9e86",
      },
    ],
    footerLink: {
      text: "View Settings",
      href: "#",
    },
  },
};

export interface DashboardViewProps {
  title?: string;
  children?: ReactNode;
}

export function DashboardView({
  title = "Dashboard",
  children,
}: DashboardViewProps) {
  if (children) {
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
          <Gallery hasGutter>
            {Array.isArray(children) ? (
              children.map((child, idx) => (
                <GalleryItem key={idx}>{child}</GalleryItem>
              ))
            ) : (
              <GalleryItem>{children}</GalleryItem>
            )}
          </Gallery>
        </PageSection>
      </>
    );
  }

  return (
    <>
      <Grid hasGutter>
        <GridItem>
          <KPICardHorizontalGrid kpi={HORIZONTAL_GRID_CARD} />
        </GridItem>

        <GridItem md={4}>
          <Card isFullHeight>
            <CardTitle>{UTILIZATION_CARD.title}</CardTitle>
            <CardBody>
              <KPIUtilizationChart kpi={UTILIZATION_CARD} />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem md={4}>
          <Card isFullHeight>
            <CardTitle>CPU utilization by node</CardTitle>
            <CardBody>
              <CpuUsageByNodeChart />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem md={4}>
          <Card isFullHeight>
            <CardTitle>Cluster CPU trend</CardTitle>
            <CardBody>
              <ClusterCpuTrendChart />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem md={6}>
          <KPICardRecommendations kpi={RECOMMENDATION_CARD} />
        </GridItem>

        <GridItem md={6}>
          <KPICardDetails kpi={DETAILS_CARD} />
        </GridItem>

        <GridItem md={4}>
          <KPICardSummary kpi={SUMMARY_CARD_ONE} />
        </GridItem>
        <GridItem md={4}>
          <KPICardSummary kpi={SUMMARY_CARD_TWO} />
        </GridItem>
        <GridItem md={4}>
          <KPICardSummary kpi={SUMMARY_CARD_THREE} />
        </GridItem>
      </Grid>
    </>
  );
}
