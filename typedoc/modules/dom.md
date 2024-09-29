[solid-pwa-navigation](../README.md) / dom

# Module: dom

## Table of contents

### Functions

- [useScroll](dom.md#usescroll)
- [useSize](dom.md#usesize)

## Functions

### useScroll

▸ **useScroll**(`target`, `pause?`): `Accessor`<[`Vec2D`](utils.md#vec2d)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`HTMLElement` \| `Window`\> |
| `pause?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`Accessor`<[`Vec2D`](utils.md#vec2d)\>

#### Defined in

[src/lib/dom/scroll.ts:15](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/dom/scroll.ts#L15)

▸ **useScroll**(`target`, `pause?`): `Accessor`<[`Vec2D`](utils.md#vec2d) \| ``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| ``null`` \| `HTMLElement` \| `Window`\> |
| `pause?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`Accessor`<[`Vec2D`](utils.md#vec2d) \| ``null``\>

#### Defined in

[src/lib/dom/scroll.ts:16](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/dom/scroll.ts#L16)

___

### useSize

▸ **useSize**(`target`, `opts?`): `Accessor`<[`Rect2D`](utils.md#rect2d)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`HTMLElement`\> |
| `opts?` | `Object` |
| `opts.pause?` | `boolean` |
| `opts.onChange?` | (`size`: [`Rect2D`](utils.md#rect2d)) => `void` |

#### Returns

`Accessor`<[`Rect2D`](utils.md#rect2d)\>

#### Defined in

[src/lib/dom/size.ts:7](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/dom/size.ts#L7)

▸ **useSize**(`target`, `opts?`): `Accessor`<[`Rect2D`](utils.md#rect2d) \| ``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| ``null`` \| `HTMLElement`\> |
| `opts?` | `Object` |
| `opts.pause?` | `boolean` |
| `opts.onChange?` | (`size`: ``null`` \| [`Rect2D`](utils.md#rect2d)) => `void` |

#### Returns

`Accessor`<[`Rect2D`](utils.md#rect2d) \| ``null``\>

#### Defined in

[src/lib/dom/size.ts:14](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/dom/size.ts#L14)
