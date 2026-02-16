# Map FPS Component

Um componente para monitorar e exibir o FPS (frames per second) de mapas MapLibre GL em tempo real, com indicadores visuais de performance.

## Características

- 📊 **Monitoramento em tempo real**: Calcula o FPS baseado nos eventos de renderização do mapa
- 🎯 **Medição específica**: Monitora apenas o FPS do mapa, não da página toda
- 🎨 **Indicadores visuais**: Cores que mudam de acordo com a performance
- 📍 **Posicionamento flexível**: Pode ser posicionado em qualquer canto do mapa
- ⚙️ **Configurável**: Tamanhos e intervalos de atualização ajustáveis
- 💤 **Estado ocioso**: Detecta quando o mapa está parado (sem interação)
- ♿ **Acessível**: Inclui atributos ARIA para leitores de tela
- 🎯 **Reutilizável**: Pode ser usado em qualquer mapa MapLibre GL

## Níveis de Performance

| FPS | Nível | Cor | Descrição |
|-----|-------|-----|-----------|
| 0 | Ocioso | Cinza | Mapa parado (sem renderização) |
| ≥55 | Excelente | Verde | Performance ideal |
| 45-54 | Bom | Azul | Performance adequada |
| 30-44 | Regular | Amarelo | Performance aceitável |
| <30 | Ruim | Vermelho | Performance insatisfatória |

## Uso Básico

```typescript
import { Component, signal } from '@angular/core';
import { Map } from 'maplibre-gl';
import { MapFpsComponent } from '@/shared/blocks/map-fps';

@Component({
  selector: 'app-map-page',
  imports: [MapFpsComponent],
  template: `
    <div class="relative h-screen">
      <mgl-map (mapLoad)="onMapLoad($event)">
        <!-- Conteúdo do mapa -->
      </mgl-map>
      
      @if (map()) {
        <z-map-fps [zMap]="map()!" />
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

### `zMap` (required)

Instância do mapa MapLibre GL para monitorar.

```typescript
[zMap]="mapInstance"
```

### `zPosition`

Posição do indicador no mapa.

- **Tipo**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **Padrão**: `'top-left'`

```html
<z-map-fps [zMap]="map()" zPosition="top-right" />
```

### `zSize`

Tamanho do indicador.

- **Tipo**: `'sm' | 'default' | 'lg'`
- **Padrão**: `'default'`

```html
<z-map-fps [zMap]="map()" zSize="lg" />
```

### `zShowLevel`

Exibe ou oculta o texto do nível de performance.

- **Tipo**: `boolean`
- **Padrão**: `true`

```html
<z-map-fps [zMap]="map()" [zShowLevel]="false" />
```

### `zUpdateInterval`

Intervalo de atualização do FPS em milissegundos.

- **Tipo**: `number`
- **Padrão**: `500`

```html
<z-map-fps [zMap]="map()" [zUpdateInterval]="1000" />
```

### `class`

Classes CSS adicionais para customização.

- **Tipo**: `ClassValue`

```html
<z-map-fps [zMap]="map()" class="opacity-80 hover:opacity-100" />
```

## Exemplos

### Indicador Compacto

```html
<z-map-fps 
  [zMap]="map()" 
  zSize="sm" 
  [zShowLevel]="false"
  zPosition="top-right" 
/>
```

### Com Atualização Mais Rápida

```html
<z-map-fps 
  [zMap]="map()" 
  [zUpdateInterval]="250"
/>
```

### Customizado com Classes

```html
<z-map-fps 
  [zMap]="map()" 
  class="ring-2 ring-primary/20"
  zPosition="bottom-right"
/>
```

## Como Funciona

O componente utiliza o evento `render` do MapLibre GL para medir o FPS do mapa especificamente:

### 1. Contagem de Frames do Mapa

```typescript
this.mapInstance.on('render', () => {
  this.frameCount++;
});
```

- O evento `render` é disparado pelo MapLibre toda vez que o mapa renderiza um frame
- Cada evento incrementa o contador `frameCount`
- **Importante**: Este evento só dispara durante interações (zoom, pan, animações)
- Quando o mapa está parado, não há eventos `render` → FPS = 0 (estado "Ocioso")

### 2. Cálculo Periódico

A cada intervalo configurado (padrão: 500ms), o FPS é calculado:

```typescript
const now = performance.now();
const delta = now - this.lastTime;  // Tempo decorrido em ms
const fps = Math.round((this.frameCount * 1000) / delta);
```

**Fórmula**: `FPS = (frames × 1000) / tempo_em_ms`

**Exemplo prático**:
- Se em 500ms foram renderizados 30 frames:
- FPS = (30 × 1000) / 500 = **60 FPS**

### 3. Reset e Atualização

Após calcular o FPS:
- O contador é resetado: `frameCount = 0`
- O timer é reiniciado: `lastTime = now`
- O nível de performance é atualizado

### Vantagens desta Abordagem

✅ **Preciso**: Mede frames reais renderizados pelo motor do mapa
✅ **Específico**: Monitora apenas o mapa, não a página toda
✅ **Leve**: Apenas incrementa um contador por frame
✅ **Inteligente**: Detecta quando o mapa está ocioso
✅ **Limpo**: Cancela listeners no `ngOnDestroy`

## Acessibilidade

- Inclui `role="status"` para anunciar mudanças
- Atributo `aria-label` com valor atual do FPS
- Usa `tabular-nums` para alinhamento consistente dos números
- Cores com contraste adequado para dark/light mode

## Performance

O componente é otimizado para ter impacto mínimo na performance:

- Usa `OnPush` change detection
- Limpa listeners do mapa no `ngOnDestroy`
- Atualiza apenas em intervalos configurados
- Não força re-renders desnecessários
- Apenas incrementa um contador por evento `render`

## Notas

- Requer MapLibre GL (`maplibre-gl`) instalado
- Funciona melhor com intervalos de atualização entre 250ms e 1000ms
- O FPS mostrado é uma média do período de atualização, não instantâneo
- **FPS 0 (Ocioso)** é normal quando o mapa está parado - indica que não há renderização
- Durante interações (zoom, pan), o FPS será medido e exibido com os níveis de performance
- Em desktops modernos, espere 60 FPS (limitado pelo VSync)
- Em celulares, o FPS varia (40-60 em médios, acima de 60 em telas 90Hz/120Hz)
