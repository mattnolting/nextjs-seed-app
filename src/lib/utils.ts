// Utility functions for PatternFly Next.js Starter

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// PatternFly specific utilities
export function getOUIAProps(componentName: string, props: Record<string, any>) {
  const { ouiaId, ouiaSafe, ...rest } = props;
  return {
    'data-ouia-component-type': componentName,
    'data-ouia-component-id': ouiaId || generateId(),
    'data-ouia-safe': ouiaSafe !== false,
    ...rest,
  };
}
