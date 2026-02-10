# Header Toolbar Component

Componente de header reutilizável e headless. Perfeito para criar toolbars de aplicativo com slots para ações personalizadas.

- **Composável**: Cada parte do header é um componente separado
- **Flexível**: Use apenas as partes que você precisa
- **Estilizável**: Customize com classes CSS do Tailwind
- **Acessível**: Semântica HTML apropriada e navegação por teclado
- **Type-safe**: Totalmente tipado com TypeScript

## Header por página

### Vantagens:

1. Flexibilidade Total - Cada página controla seu próprio header (título, ações, estilo)
2. Componentes Opcionais - Páginas que não precisam de header não o incluem
3. Simplicidade - Não precisa de serviço de estado complexo para sincronizar
4. Customização Fácil - Sticky em uma página, não sticky em outra
5. Segue a Filosofia - Componentes composáveis e independentes
6. Manutenção Clara - Mudanças no header de uma página não afetam outras

## Componentes

- **HeaderToolbarComponent** (`z-header-toolbar`) - Container principal
- **HeaderTitleComponent** (`z-header-title`) - Título centralizado
- **HeaderActionsComponent** (`z-header-actions`) - Slot para ações adicionais (direita)

## Acessibilidade

O header é acessível por padrão:

- O elemento `<header>` possui `role="banner"`
- Os botões podem receber foco via teclado
- As ações podem ser ativadas via Enter ou Space
- O título usa truncamento de texto apropriado

## Props

### HeaderToolbarComponent

| Prop      | Tipo                        | Padrão      | Descrição                     |
| --------- | --------------------------- | ----------- | ----------------------------- |
| `class`   | `ClassValue`                | `''`        | Classes CSS adicionais        |
| `zSize`   | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho do header             |
| `zSticky` | `boolean`                   | `false`     | Torna o header sticky no topo |

### HeaderTitleComponent / HeaderActionsComponent

| Prop    | Tipo                        | Padrão      | Descrição              |
| ------- | --------------------------- | ----------- | ---------------------- |
| `class` | `ClassValue`                | `''`        | Classes CSS adicionais |
| `zSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho (spacing)      |
