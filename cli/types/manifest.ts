/**
 * Build Manifest Type Definitions
 *
 * The .build.json file structure and validation types
 */

export type SlotType = "required" | "optional";
export type ComponentType =
  | "card"
  | "chart"
  | "table"
  | "form"
  | "nav"
  | "filter"
  | "custom";
export type LayoutType = "dashboard" | "gallery" | "table" | "split-view";
export type ComponentVersion = "basic" | "verbose";

export interface LayoutSlot {
  id: string;
  required: boolean;
  allowedComponents: ComponentType[];
  multiple: boolean;
  description?: string;
}

export interface Layout {
  name: string;
  type: LayoutType;
  path: string;
  slots: LayoutSlot[];
  features?: string[];
}

export interface Component {
  name: string;
  type: ComponentType;
  path: string;
  standalone: boolean;
  compatibleSlots: string[];
  props: Record<string, any>;
  version: ComponentVersion;
  usedIn: string[];
  dependencies?: string[];
}

export interface Route {
  path: string;
  layout: string;
  title?: string;
  priority?: number;
  slots: Record<
    string,
    {
      component: string;
      props?: Record<string, any>;
    }
  >;
  features?: string[];
}

export interface Scaffold {
  path: string;
  layouts: {
    masthead: { enabled: boolean; component?: string };
    sidebar: { enabled: boolean; component?: string };
    main: { enabled: boolean };
  };
}

export interface BuildManifest {
  version: string;
  lastModified: string;
  scaffold: Scaffold;
  layouts: Layout[];
  components: Component[];
  routes: Route[];
}

/**
 * Validation error types
 */
export interface ValidationError {
  type:
    | "missing_slot"
    | "type_mismatch"
    | "circular_dependency"
    | "name_conflict";
  message: string;
  affected: string[];
  suggestion?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}
