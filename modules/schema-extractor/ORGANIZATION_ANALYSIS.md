# Schema Organization Analysis

## Current State: Monolithic Approach

Currently, we extract one component at a time into a single `ComponentSchema` object. This works for individual component extraction but may not scale well for a complete Next.js starter application.

## Organizational Approaches

### 1. **Component-Isolated Schemas** (Recommended)

```
/schemas/
  /Button/
    - button.schema.json
    - button.types.ts
    - button.template.tsx
  /Alert/
    - alert.schema.json
    - alert.types.ts
    - alert.template.tsx
  /Form/
    - form.schema.json
    - form.types.ts
    - form.template.tsx
```

**Benefits:**

- **Modularity**: Each component is self-contained
- **Incremental Generation**: Generate components independently
- **Framework Flexibility**: Easy to adapt for different frameworks
- **Team Collaboration**: Different teams can work on different components
- **Selective Inclusion**: Include only needed components in starter apps
- **Versioning**: Version components independently
- **Testing**: Test each component schema in isolation

### 2. **Monolithic Schema**

```
/schemas/
  - patternfly-components.schema.json
  - all-types.ts
  - all-templates.tsx
```

**Drawbacks:**

- **Tight Coupling**: All components must be generated together
- **Large Files**: Difficult to manage and review
- **Framework Lock-in**: Hard to adapt for different frameworks
- **Team Conflicts**: Multiple teams editing same files
- **Selective Generation**: Can't easily exclude components

## Framework-Specific Considerations

### **Next.js Organization**

Next.js follows a component-based architecture:

```
/app/
  /components/
    /Button/
      - Button.tsx
      - Button.types.ts
      - Button.stories.tsx
    /Alert/
      - Alert.tsx
      - Alert.types.ts
      - Alert.stories.tsx
```

**Schema Mapping:**

- Each PatternFly component → Next.js component directory
- Schema files mirror Next.js structure
- Templates generate Next.js-specific files

### **Vite Organization**

Vite also uses component-based structure:

```
/src/
  /components/
    /Button/
      - Button.vue
      - Button.types.ts
      - Button.stories.ts
```

**Schema Mapping:**

- Same component isolation
- Different template files for Vue
- Shared schema, different generators

### **Svelte Organization**

```
/src/
  /lib/
    /components/
      /Button/
        - Button.svelte
        - Button.types.ts
        - Button.stories.svelte
```

## Recommended Architecture

### **Schema Structure**

```
/schemas/
  /components/
    /Button/
      - schema.json          # Extracted metadata
      - types.ts            # TypeScript definitions
      - validation.json     # Validation rules
      /templates/
        - nextjs.tsx        # Next.js template
        - vue.vue           # Vue template
        - svelte.svelte     # Svelte template
    /Alert/
      - schema.json
      - types.ts
      - validation.json
      /templates/
        - nextjs.tsx
        - vue.vue
        - svelte.svelte
  /shared/
    - patternfly-types.ts   # Shared PatternFly types
    - validation-rules.ts   # Common validation
    - template-utils.ts     # Template utilities
```

### **Generation Flow**

```
PatternFly Component → Schema Extraction → Component Schema → Framework Template → Generated Component
```

### **Benefits of Component Isolation**

1. **Flexibility**

   - Generate only needed components
   - Mix and match components
   - Different versions per component

2. **Framework Adaptability**

   - Same schema, different templates
   - Easy to add new frameworks
   - Framework-specific optimizations

3. **Team Scalability**

   - Different teams per component
   - Independent development cycles
   - Reduced merge conflicts

4. **Maintenance**

   - Update individual components
   - Isolated testing
   - Clear ownership

5. **PatternFly Alignment**
   - Mirrors PatternFly's component structure
   - Easy to sync with PatternFly updates
   - Component-specific documentation

## Implementation Strategy

### **Phase 1: Component Isolation**

- Refactor current monolithic approach
- Create component-specific schema files
- Implement component-based generation

### **Phase 2: Multi-Framework Support**

- Add template system for different frameworks
- Create framework-specific generators
- Implement shared utilities

### **Phase 3: Advanced Features**

- Component dependencies
- Cross-component validation
- Bundle optimization

## Next.js Starter App Structure

### **Generated Structure**

```
/nextjs-starter/
  /app/
    /components/
      /Button/
        - Button.tsx
        - Button.types.ts
        - Button.stories.tsx
        - Button.test.tsx
      /Alert/
        - Alert.tsx
        - Alert.types.ts
        - Alert.stories.tsx
        - Alert.test.tsx
    /lib/
      - patternfly-types.ts
      - utils.ts
  /styles/
    - patternfly.css
  /package.json
  /next.config.js
```

### **Schema-Driven Generation**

- Each component schema generates its own files
- Shared utilities generated once
- Framework-specific configurations
- Component-specific documentation

## Conclusion

**Component isolation is the superior approach** for our PatternFly modernization initiative because:

1. **Aligns with PatternFly's component-based architecture**
2. **Supports multiple frameworks (Next.js, Vite, Svelte)**
3. **Enables selective component generation**
4. **Facilitates team collaboration**
5. **Provides framework flexibility**
6. **Supports incremental adoption**

This approach directly serves PatternFly's modernization goals by providing flexible, maintainable tooling that can adapt to different framework needs while maintaining consistency across teams.
