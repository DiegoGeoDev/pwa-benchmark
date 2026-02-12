# Scaffold Component

Componente principal de layout, perfeito para PWAs que precisam se comportar como aplicativos nativos.

## Componentes

- **ScaffoldComponent** (`z-scaffold`) - Container principal
- **AppBarComponent** (`z-app-bar`) - Barra superior
- **ScaffoldBodyComponent** (`z-scaffold-body`) - Área de conteúdo scrollável

## Props

### ScaffoldComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zSafeArea` | `boolean` | `false` | Ativa safe areas para notch/home indicator |

### AppBarComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zElevation` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Sombra do app bar |
| `zTransparent` | `boolean` | `false` | App bar transparente |
| `zSticky` | `boolean` | `true` | App bar fixo no topo |

### ScaffoldBodyComponent

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `class` | `ClassValue` | `''` | Classes CSS adicionais |
| `zPadding` | `'none' \| 'sm' \| 'default' \| 'lg'` | `'none'` | Padding do conteúdo |

### Eventos

**ScaffoldBodyComponent**
- `onScroll` - Emitido durante o scroll com posição

## Acessibilidade

- Usa `role="main"` no scaffold
- App bar marcado semanticamente
