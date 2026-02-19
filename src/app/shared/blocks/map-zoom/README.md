# Map Zoom Component

Um componente para exibir o nível de zoom atual de mapas MapLibre GL em tempo real, com indicadores visuais por nível geográfico e barra de progresso.

## Características

- 🔍 **Zoom em tempo real**: Atualiza automaticamente via evento `zoom` do MapLibre GL
- 🌍 **Níveis geográficos**: Classifica o zoom em categorias significativas (World, Region, City, District, Street)
- 🎨 **Cores por nível**: Cada nível tem cor de texto e fundo distintos
- 📊 **Barra de progresso**: Representa visualmente o zoom em relação ao máximo (22)
- 📍 **Posicionamento flexível**: Pode ser posicionado em qualquer canto do mapa
- 💤 **Estado ocioso**: Exibe `--` antes da primeira interação com o mapa
- ♿ **Acessível**: Inclui `role="status"` e `aria-label` descritivo

## Níveis de Zoom

| Zoom | Nível | Cor | Exemplos |
|------|-------|-----|---------|
| null | Idle | Cinza | Antes da primeira interação |
| ≤ 4 | World | Azul | Continentes, oceanos |
| ≤ 8 | Region | Ciano | Países, estados |
| ≤ 12 | City | Verde | Cidades, municípios |
| ≤ 16 | District | Amarelo | Bairros, ruas principais |
| > 16 | Street | Laranja | Ruas, edifícios |

## Uso Básico

```typescript
import { Component, signal } from '@angular/core';
import { Map } from 'maplibre-gl';
import { MapZoomComponent } from '@/shared/blocks/map-zoom';

@Component({
  selector: 'app-map-page',
  imports: [MapZoomComponent],
  template: `
    <div class="relative h-screen">
      <mgl-map (mapLoad)="onMapLoad($event)">
        <!-- Conteúdo do mapa -->
      </mgl-map>

      @if (map()) {
        <z-map-zoom [zMap]="map()!" />
      }
    </div>
  `,
})
export class MapPage {
  map = signal<Map | null>(null);

  onMapLoad(map: Map): void {
    this.map.set(map);
  }
}
```

## Props

### `zMap` (obrigatório)

Instância do mapa MapLibre GL a ser monitorada.

```html
<z-map-zoom [zMap]="mapInstance" />
```

### `zPosition`

Posição do indicador no mapa.

- **Tipo**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **Padrão**: `'bottom-left'`

```html
<z-map-zoom [zMap]="map()" zPosition="bottom-right" />
```

### `zShowLabel`

Exibe ou oculta o rótulo do nível geográfico.

- **Tipo**: `boolean`
- **Padrão**: `true`

```html
<z-map-zoom [zMap]="map()" [zShowLabel]="false" />
```

### `class`

Classes CSS adicionais para customização.

- **Tipo**: `ClassValue`

```html
<z-map-zoom [zMap]="map()" class="opacity-80 hover:opacity-100" />
```

## Exemplos

### Sem rótulo de nível

```html
<z-map-zoom [zMap]="map()" [zShowLabel]="false" />
```

### Canto inferior direito

```html
<z-map-zoom [zMap]="map()" zPosition="bottom-right" />
```

### Combinado com `z-map-fps`

```html
@if (map()) {
  <z-map-fps [zMap]="map()!" zPosition="top-left" />
  <z-map-zoom [zMap]="map()!" zPosition="bottom-left" />
}
```

### Com classes customizadas

```html
<z-map-zoom
  [zMap]="map()"
  class="ring-2 ring-white/10"
  zPosition="bottom-right"
/>
```

## Como Funciona

### 1. Zoom Inicial

Ao receber a instância do mapa via `zMap`, o componente lê o zoom atual imediatamente:

```typescript
this.currentZoom.set(map.getZoom());
```

### 2. Atualizações em Tempo Real

O componente escuta o evento `zoom` do MapLibre GL, que dispara continuamente durante gestos de zoom:

```typescript
this.mapInstance.on('zoom', () => {
  this.currentZoom.set(this.mapInstance.getZoom());
});
```

### 3. Cálculo do Nível e da Barra

- **Nível**: determinado pela faixa do zoom atual
- **Barra**: `(zoom / 22) * 100%`, limitado a 100%

### 4. Limpeza

O listener é removido no `ngOnDestroy` para evitar memory leaks:

```typescript
this.mapInstance.off('zoom', this.zoomListener);
```

## Acessibilidade

- `role="status"` anuncia mudanças para leitores de tela
- `aria-label` descritivo: `"Zoom: 14.5, nível CITY"` ou `"Zoom: inativo"`
- Usa `tabular-nums` para alinhamento consistente dos números
- Contraste de cores adequado nos fundos semi-transparentes escuros

## Performance

- `ChangeDetectionStrategy.OnPush` — re-renderiza apenas quando signals mudam
- `computed()` para todos os valores derivados
- Listener único no evento `zoom` (não usa `requestAnimationFrame`)
- Limpeza garantida via `ngOnDestroy`
