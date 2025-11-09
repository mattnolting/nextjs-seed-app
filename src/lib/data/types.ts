/**
 * Type definitions for app-data.json
 * Single source of truth for all component data
 */

export interface KPICardLabel {
  text: string;
  color: "blue" | "purple" | "green" | "orange" | "red" | "grey" | "orangered" | "teal" | "yellow";
  icon?: boolean;
}

export interface KPICardGridItem {
  label: KPICardLabel;
  description: string;
  links: Array<{ text: string; href: string; external?: boolean }>;
  viewAllLink: { text: string; href: string };
}

export interface KPICardDetailItem {
  term: string;
  description: string | React.ReactNode;
  isLink?: boolean;
  href?: string;
}

export interface KPICard {
  id: string;
  title: string;
  value?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  description?: string;
  expandable?: {
    enabled: boolean;
    defaultExpanded?: boolean;
    body?: string;
    footer?: string;
    hasCheckbox?: boolean;
    hasDropdown?: boolean;
    isToggleRightAligned?: boolean;
  };
  horizontalGrid?: {
    enabled: boolean;
    defaultExpanded?: boolean;
    labels?: KPICardLabel[];
    gridItems?: KPICardGridItem[];
    span?: number; // Grid span (12 for full width)
  };
  details?: {
    enabled: boolean;
    title?: string;
    titleHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    titleSize?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    items?: KPICardDetailItem[];
    footerLink?: { text: string; href: string };
    ariaLabel?: string;
    span?: number; // Grid span
  };
  utilization?: {
    enabled: boolean;
    title?: string;
    titleHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    titleSize?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    value: number; // Utilization percentage (0-100)
    total?: string; // Total capacity (e.g., "100 GBps")
    thresholds?: Array<{ label: string; value: number }>; // Warning/danger thresholds
    footerLink?: { text: string; href: string };
    ariaDesc?: string;
    ariaTitle?: string;
    span?: number; // Grid span
  };
  recommendations?: {
    enabled: boolean;
    title?: string;
    titleHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    titleSize?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    systemLabel?: string;
    incidentCount?: number;
    incidentLink?: { text: string; href: string };
    chartData?: Array<{
      name: string;
      value: number;
      label: string;
    }>;
    chartColors?: string[];
    filterOptions?: Array<{ key: string; value: string }>;
    footerLink?: { text: string; href: string };
    ariaDesc?: string;
    ariaTitle?: string;
    span?: number; // Grid span
  };
}

export interface ChartData {
  name: string;
  x: string;
  y: number;
  label?: string;
}

export interface ChartConfig {
  id: string;
  type: "area" | "bar" | "donut" | "line" | "bar-grouped";
  title?: string;
  subtitle?: string;
  data: ChartData[];
  legendData?: Array<{ name: string; childName?: string; symbol?: { type: string } }>;
  legendPosition?: "bottom" | "bottom-left" | "right";
  padding?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  domainPadding?: {
    x?: [number, number];
    y?: [number, number];
  };
  height?: number;
  width?: number;
  themeColor?: string;
  colorScale?: string[];
  groupOffset?: number;
  maxDomain?: Record<string, number>;
  minDomain?: Record<string, number>;
  seriesData?: Array<{ name: string; data: ChartData[] }>;
}

export interface CardItem {
  id: string | number;
  title: string;
  content?: React.ReactNode;
  description?: string;
  icon?: string;
  image?: string;
  meta?: Record<string, string>;
}

export interface CardViewData {
  items: CardItem[];
  filters?: {
    categories: Record<string, string[]>;
  };
}

export interface TableRow {
  id: string | number;
  cells: (string | number | React.ReactNode)[];
}

export interface TableViewData {
  columns: string[];
  rows: TableRow[];
  filters?: {
    categories: Record<string, string[]>;
  };
}

export interface PrimaryItem {
  id: string | number;
  title: string;
  description?: string;
  meta?: Record<string, string>;
  [key: string]: any;
}

export interface PrimaryDetailData {
  primaryItems: PrimaryItem[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "textarea" | "checkbox" | "radio";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: string; // validation function name
  };
}

export interface FormViewData {
  fields: FormField[];
  validation?: Record<string, any>;
}

export interface AppData {
  cardView: CardViewData;
  tableView: TableViewData;
  primaryDetail: PrimaryDetailData;
  formView: FormViewData;
}

