# FallingLeaves Component

A decorative ambient animation component that renders physics-simulated falling leaves across the viewport. Client-side only — safe to use in Next.js App Router with no SSR issues.

## Features

- **Physics simulation**: gravity, horizontal drift, and per-leaf rotation at ~60fps
- **Configurable density**: control how many leaves are on screen at once
- **Spawn rate control**: adjust how frequently new leaves appear
- **Enable/disable**: toggle the effect without unmounting
- **Fixed-position overlay**: renders above page content without affecting layout
- **Four leaf variants**: randomly selected from `/assets/` images

## File Structure

```
FallingLeaves/
├── index.ts                 # Main exports
├── FallingLeaves.tsx        # Main component implementation
├── FallingLeaves.types.ts   # TypeScript type definitions
└── README.md                # Documentation
```

## Usage

### Basic

```tsx
import { FallingLeaves } from './components/atoms/FallingLeaves';

<FallingLeaves />
```

### Custom Density & Speed

```tsx
<FallingLeaves leafCount={25} spawnRate={1000} />
```

### Toggleable

```tsx
const [active, setActive] = useState(false);

<FallingLeaves enabled={active} />
<Button onClick={() => setActive(v => !v)}>Toggle Leaves</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leafCount` | `number` | `15` | Maximum number of leaves visible on screen at once |
| `spawnRate` | `number` | `2000` | Interval in milliseconds between new leaf spawns |
| `enabled` | `boolean` | `true` | Enable or disable the animation |

## Behavior

- Renders as a `fixed` full-viewport overlay with `pointer-events: none` — it won't block interactions
- Leaves spawn at random horizontal positions along the top edge and drift left as they fall
- Each leaf has randomized scale, rotation speed, drift, and gravity values for organic variation
- When `enabled` is set to `false`, existing leaves finish their animation and no new ones spawn
- Requires leaf image assets at `/assets/leaf1.png`, `/assets/leaf2.png`, `/assets/leaf3.png`, `/assets/leaf4.png`

## Usage Guidelines

### Do's
- Use as a seasonal or decorative accent on landing pages
- Pair with `enabled` toggle so users can disable it if preferred
- Keep `leafCount` low (10–20) to avoid performance impact on lower-end devices

### Don'ts
- Don't use inside scrollable containers — it is viewport-fixed by design
- Don't stack multiple `FallingLeaves` instances
- Don't use in data-dense UIs where the animation would be distracting
