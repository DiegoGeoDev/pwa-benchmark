
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Component Library Patterns

This project uses a component library inspired by shadcn/ui and zardui, following a headless component philosophy with Tailwind CSS for styling.

### Architecture Philosophy

- **Headless Components**: Create unstyled, composable components that accept styling through classes
- **Separation of Concerns**: Keep logic (services, directives) separate from UI (components)
- **Modular Design**: Break complex components into smaller, focused sub-components
- **Slot-based Composition**: Use `<ng-content>` for flexible component composition

### Component Structure

When creating components for `src/app/shared/components/` or `src/app/shared/blocks/`:

1. **Component File** (`.component.ts`)
   - Use `ViewEncapsulation.None` to allow external styling
   - Use `ChangeDetectionStrategy.OnPush` for performance
   - Accept a `class` input of type `ClassValue` for additional styling
   - Use `computed()` to merge variant classes with custom classes
   - Keep templates simple (inline for small components, external for complex ones)

2. **Variants File** (`.variants.ts`)
   - Use `class-variance-authority` (CVA) for variant management
   - Export variant functions using `cva(baseClasses, { variants, defaultVariants })`
   - Export TypeScript types for variant props using `VariantProps<typeof variantFunction>`
   - Use the `mergeClasses` utility to combine Tailwind classes

3. **Service File** (`.service.ts`) - When needed
   - Extract business logic, state management, or complex behavior
   - Use `providedIn: 'root'` for singleton services
   - Use signals for reactive state

4. **Directive File** (`.directive.ts`) - When needed
   - Create for reusable DOM manipulation or behavior
   - Use for string/template outlet patterns
   - Use the `host` object for host bindings

5. **Barrel Export** (`index.ts`)
   - Export all components, services, types, and utilities
   - Makes imports cleaner: `from '@/shared/blocks/header'`

6. **Documentation** (`README.md`) - Recommended
   - Provide usage examples
   - Document all props and variants
   - Include accessibility notes
   - Show common patterns

7. **Examples File** (`.examples.ts`) - Optional
   - Create practical, copy-paste examples
   - Show different use cases and patterns

### Component Implementation Pattern

```typescript
// component.ts
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import type { ClassValue } from 'clsx';
import { mergeClasses } from '../../utils/merge-classes';
import { componentVariants, type ComponentSizeVariants } from './component.variants';

@Component({
  selector: 'z-component',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zComponent',
})
export class ComponentName {
  readonly class = input<ClassValue>('');
  readonly zSize = input<ComponentSizeVariants>('default');
  readonly zVariant = input<ComponentVariantTypes>('default');

  protected readonly classes = computed(() =>
    mergeClasses(
      componentVariants({
        zSize: this.zSize(),
        zVariant: this.zVariant(),
      }),
      this.class(),
    ),
  );
}
```

```typescript
// component.variants.ts
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClasses } from '../../utils/merge-classes';

export const componentVariants = cva(
  mergeClasses(
    'base-classes',
    'common-styles',
  ),
  {
    variants: {
      zSize: {
        sm: 'small-styles',
        default: 'default-styles',
        lg: 'large-styles',
      },
      zVariant: {
        default: 'default-variant-styles',
        primary: 'primary-variant-styles',
      },
    },
    defaultVariants: {
      zSize: 'default',
      zVariant: 'default',
    },
  },
);

export type ComponentSizeVariants = VariantProps<typeof componentVariants>['zSize'];
export type ComponentVariantTypes = VariantProps<typeof componentVariants>['zVariant'];
```

### Naming Conventions

- **Selectors**: Use `z-` prefix for library components (e.g., `z-button`, `z-header-toolbar`)
- **Props**: Use `z` prefix for variant inputs (e.g., `zSize`, `zType`, `zVariant`)
- **Types**: Use `Zard` prefix and descriptive suffix (e.g., `ZardButtonSizeVariants`)
- **Classes**: Use PascalCase with descriptive names (e.g., `HeaderToolbarComponent`)

### Modular Component Pattern

For complex components like toolbars, headers, or cards:

1. Create a main container component
2. Create sub-components for each logical section (e.g., `HeaderBackAction`, `HeaderTitle`, `HeaderActions`)
3. Each sub-component should:
   - Accept its own `class` input for customization
   - Accept relevant variant inputs (e.g., `zSize`)
   - Use `<ng-content>` for slot-based composition
   - Have its own variant definition
4. Export all components and types from `index.ts`

### Accessibility Requirements

- Use semantic HTML elements (`<header>`, `<nav>`, `<button>`, etc.)
- Include appropriate ARIA attributes (`role`, `aria-label`, `aria-expanded`, etc.)
- Ensure keyboard navigation works (tab order, Enter/Space activation)
- Provide focus indicators via Tailwind classes
- Export components with `exportAs` for template references

### Best Practices

- **Reusability**: Make components flexible through props and slots
- **Composability**: Allow nesting and combination of components
- **Customization**: Always accept `class` input for Tailwind overrides
- **Type Safety**: Export all variant types for consumer type checking
- **Performance**: Use `computed()` for derived values, `OnPush` change detection
- **Consistency**: Follow existing component patterns in the project
- **Documentation**: Provide clear examples and prop documentation
