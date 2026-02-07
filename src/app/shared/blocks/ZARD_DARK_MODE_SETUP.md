# Zard UI Dark Mode Setup Instructions

## 1. Update index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- ... your existing head content -->

    <!-- add this script to handle dark mode on initial load -->
    <script>
      (function () {
        const html = document.documentElement;

        try {
          const theme = localStorage.theme;
          const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

          const isSystem = theme === 'system' || !('theme' in localStorage);
          const isDark = theme === 'dark' || (isSystem && prefersDark);
          const resolvedTheme = isDark ? 'dark' : 'light';
          html.classList.toggle('dark', isDark);
          html.classList.toggle('dark-theme', isDark);
          html.setAttribute('data-theme', theme ?? 'system');
          html.style.colorScheme = resolvedTheme;
        } catch (_) {}
      })();
    </script>
  </head>
  <!-- ... your existing body content -->
</html>
```

## 2. Update providezard.ts

```ts
import {
  // existing imports...
  inject,
  provideAppInitializer,
} from '@angular/core';
// existing imports...
import { ZardDarkMode } from '../../blocks/dark-mode/dark-mode.service';

export function provideZard(): EnvironmentProviders {
  // existing provider setup...

  return makeEnvironmentProviders([
    provideAppInitializer(() => inject(ZardDarkMode).init()),
    ...eventManagerPlugins,
  ]);
}
```
