[solid-pwa-navigation](../README.md) / gestures

# Module: gestures

## Table of contents

### Type Aliases

- [DraggableEventPhase](gestures.md#draggableeventphase)
- [DraggableStateMap](gestures.md#draggablestatemap)
- [DraggableStateType](gestures.md#draggablestatetype)
- [NarrowedMouseDownEvent](gestures.md#narrowedmousedownevent)
- [NarrowedTouchEvent](gestures.md#narrowedtouchevent)
- [UseDraggableParams](gestures.md#usedraggableparams)
- [UseDraggableResult](gestures.md#usedraggableresult)

### Functions

- [useDraggable](gestures.md#usedraggable)

## Type Aliases

### DraggableEventPhase

Ƭ **DraggableEventPhase**: ``"begin"`` \| ``"running"`` \| ``"end"``

#### Defined in

[src/lib/gestures/draggable.ts:36](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L36)

___

### DraggableStateMap

Ƭ **DraggableStateMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dragging` | { `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `touchId?`: `string` \| `number`  } |
| `dragging.initialCoords` | [`Vec2D`](utils.md#vec2d) |
| `dragging.touchId?` | `string` \| `number` |
| `idle` | { `initialCoords?`: `undefined` ; `touchId?`: `undefined`  } |
| `idle.initialCoords?` | `undefined` |
| `idle.touchId?` | `undefined` |

#### Defined in

[src/lib/gestures/draggable.ts:12](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L12)

___

### DraggableStateType

Ƭ **DraggableStateType**: keyof [`DraggableStateMap`](gestures.md#draggablestatemap)

#### Defined in

[src/lib/gestures/draggable.ts:23](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L23)

___

### NarrowedMouseDownEvent

Ƭ **NarrowedMouseDownEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clientX` | `number` |
| `clientY` | `number` |

#### Defined in

[src/lib/gestures/draggable.ts:31](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L31)

___

### NarrowedTouchEvent

Ƭ **NarrowedTouchEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `changedTouches` | `ArrayLike`<{ `clientX`: `number` ; `clientY`: `number` ; `identifier`: `string` \| `number`  }\> |
| `touches` | `ArrayLike`<{ `clientX`: `number` ; `clientY`: `number` ; `identifier`: `string` \| `number`  }\> |
| `type` | `string` |

#### Defined in

[src/lib/gestures/draggable.ts:25](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L25)

___

### UseDraggableParams

Ƭ **UseDraggableParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |
| `draggableEl` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`HTMLElement` \| `Window` \| `Document` \| ``null`` \| `undefined`\> |
| `preventDefault?` | `boolean` \| (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `phase`: [`DraggableEventPhase`](gestures.md#draggableeventphase)  }) => `boolean` |
| `stopPropagation?` | `boolean` \| (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `phase`: [`DraggableEventPhase`](gestures.md#draggableeventphase)  }) => `boolean` |
| `filter?` | (`params`: { `initialCoords`: [`Vec2D`](utils.md#vec2d)  }) => `boolean` |
| `onDragEnd?` | (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `velocity`: [`Vec2D`](utils.md#vec2d)  }) => `void` |
| `onDragMove?` | (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `velocity`: [`Vec2D`](utils.md#vec2d)  }) => `void` |
| `onDragStart?` | (`params`: { `initialCoords`: [`Vec2D`](utils.md#vec2d)  }) => `void` |

#### Defined in

[src/lib/gestures/draggable.ts:40](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L40)

___

### UseDraggableResult

Ƭ **UseDraggableResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dragging` | `Accessor`<`boolean`\> |
| `velocity` | `Accessor`<[`Vec2D`](utils.md#vec2d)\> |

#### Defined in

[src/lib/gestures/draggable.ts:65](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L65)

## Functions

### useDraggable

▸ **useDraggable**(`props`): [`UseDraggableResult`](gestures.md#usedraggableresult)

A hook that provides event listeners for a dragging operation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`UseDraggableParams`](gestures.md#usedraggableparams) | [UseDraggableParams](gestures.md#usedraggableparams) |

#### Returns

[`UseDraggableResult`](gestures.md#usedraggableresult)

#### Defined in

[src/lib/gestures/draggable.ts:75](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L75)
