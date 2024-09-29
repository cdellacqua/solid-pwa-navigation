[solid-pwa-navigation](../README.md) / gestures

# Module: gestures

## Table of contents

### Type Aliases

- [NarrowedMouseDownEvent](gestures.md#narrowedmousedownevent)
- [NarrowedTouchEvent](gestures.md#narrowedtouchevent)
- [UseDraggableParams](gestures.md#usedraggableparams)
- [UseDraggableResult](gestures.md#usedraggableresult)

### Functions

- [useDraggable](gestures.md#usedraggable)

## Type Aliases

### NarrowedMouseDownEvent

Ƭ **NarrowedMouseDownEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clientX` | `number` |
| `clientY` | `number` |

#### Defined in

[src/lib/gestures/draggable.ts:29](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L29)

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

[src/lib/gestures/draggable.ts:23](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L23)

___

### UseDraggableParams

Ƭ **UseDraggableParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |
| `draggableEl` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`HTMLElement` \| `Window` \| `Document` \| ``null`` \| `undefined`\> |
| `preventDefault?` | `boolean` \| (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d)  }) => `boolean` |
| `stopPropagation?` | `boolean` \| (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d)  }) => `boolean` |
| `filter?` | (`params`: { `initialCoords`: [`Vec2D`](utils.md#vec2d)  }) => `boolean` |
| `onDragEnd?` | (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `velocity`: [`Vec2D`](utils.md#vec2d)  }) => `void` |
| `onDragMove?` | (`params`: { `coords`: [`Vec2D`](utils.md#vec2d) ; `initialCoords`: [`Vec2D`](utils.md#vec2d) ; `velocity`: [`Vec2D`](utils.md#vec2d)  }) => `void` |
| `onDragStart?` | (`params`: { `initialCoords`: [`Vec2D`](utils.md#vec2d)  }) => `void` |

#### Defined in

[src/lib/gestures/draggable.ts:36](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L36)

___

### UseDraggableResult

Ƭ **UseDraggableResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dragging` | `Accessor`<`boolean`\> |
| `velocity` | `Accessor`<[`Vec2D`](utils.md#vec2d)\> |

#### Defined in

[src/lib/gestures/draggable.ts:61](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L61)

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

[src/lib/gestures/draggable.ts:71](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/gestures/draggable.ts#L71)
