[solid-pwa-navigation](../README.md) / utils

# Module: utils

## Table of contents

### Type Aliases

- [MaybeArray](utils.md#maybearray)
- [MaybePromise](utils.md#maybepromise)
- [Rect2D](utils.md#rect2d)
- [Vec2D](utils.md#vec2d)

### Variables

- [Vec2DMath](utils.md#vec2dmath)
- [emptyArray](utils.md#emptyarray)

### Functions

- [alwaysArray](utils.md#alwaysarray)
- [animationFrame](utils.md#animationframe)
- [clamp](utils.md#clamp)
- [dbg](utils.md#dbg)
- [find](utils.md#find)
- [findIndex](utils.md#findindex)
- [mapBetweenRanges](utils.md#mapbetweenranges)
- [mapRatio](utils.md#mapratio)
- [maybeCall](utils.md#maybecall)
- [noop](utils.md#noop)
- [omit](utils.md#omit)
- [unpromisify](utils.md#unpromisify)

## Type Aliases

### MaybeArray

Ƭ **MaybeArray**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/utils/collections.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/collections.ts#L1)

___

### MaybePromise

Ƭ **MaybePromise**<`T`\>: `T` \| `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/utils/promise.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/promise.ts#L1)

___

### Rect2D

Ƭ **Rect2D**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

[src/lib/utils/math.ts:24](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/math.ts#L24)

___

### Vec2D

Ƭ **Vec2D**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/lib/utils/math.ts:19](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/math.ts#L19)

## Variables

### Vec2DMath

• `Const` **Vec2DMath**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `scale` | (`k`: `number`, `v`: [`Vec2D`](utils.md#vec2d)) => [`Vec2D`](utils.md#vec2d) |
| `sub` | (`v1`: [`Vec2D`](utils.md#vec2d), `v2`: [`Vec2D`](utils.md#vec2d)) => [`Vec2D`](utils.md#vec2d) |

#### Defined in

[src/lib/utils/math.ts:29](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/math.ts#L29)

___

### emptyArray

• `Const` **emptyArray**: readonly []

#### Defined in

[src/lib/utils/collections.ts:31](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/collections.ts#L31)

## Functions

### alwaysArray

▸ **alwaysArray**<`T`\>(`maybeArr`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `maybeArr` | [`MaybeArray`](utils.md#maybearray)<`T`\> |

#### Returns

`T`[]

#### Defined in

[src/lib/utils/collections.ts:3](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/collections.ts#L3)

___

### animationFrame

▸ **animationFrame**(`opts?`): `Promise`<`DOMHighResTimeStamp`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Object` |
| `opts.signal?` | `AbortSignal` |

#### Returns

`Promise`<`DOMHighResTimeStamp`\>

#### Defined in

[src/lib/utils/timing.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/timing.ts#L1)

___

### clamp

▸ **clamp**(`value`, `min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

[src/lib/utils/math.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/math.ts#L1)

___

### dbg

▸ **dbg**<`T`\>(`v`, `msg?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |
| `msg?` | `string` |

#### Returns

`T`

#### Defined in

[src/lib/utils/dbg.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/dbg.ts#L1)

___

### find

▸ **find**<`T`\>(`arr`, `predicate`): `T` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `ArrayLike`<`T`\> |
| `predicate` | (`item`: `T`, `index`: `number`, `arr`: `ArrayLike`<`T`\>) => `boolean` |

#### Returns

`T` \| `undefined`

#### Defined in

[src/lib/utils/collections.ts:7](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/collections.ts#L7)

___

### findIndex

▸ **findIndex**<`T`\>(`arr`, `predicate`): `number` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `ArrayLike`<`T`\> |
| `predicate` | (`item`: `T`, `index`: `number`, `arr`: `ArrayLike`<`T`\>) => `boolean` |

#### Returns

`number` \| `undefined`

#### Defined in

[src/lib/utils/collections.ts:19](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/collections.ts#L19)

___

### mapBetweenRanges

▸ **mapBetweenRanges**(`value`, `minInput`, `maxInput`, `minOutput`, `maxOutput`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `minInput` | `number` |
| `maxInput` | `number` |
| `minOutput` | `number` |
| `maxOutput` | `number` |

#### Returns

`number`

#### Defined in

[src/lib/utils/math.ts:5](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/math.ts#L5)

___

### mapRatio

▸ **mapRatio**(`value`, `minOutput`, `maxOutput`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `minOutput` | `number` |
| `maxOutput` | `number` |

#### Returns

`number`

#### Defined in

[src/lib/utils/math.ts:15](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/math.ts#L15)

___

### maybeCall

▸ **maybeCall**<`TOrFn`\>(`maybeFn`, `...params`): `TOrFn` extends (...`params`: `any`[]) => `any` ? `ReturnType`<`TOrFn`\> : `TOrFn`

#### Type parameters

| Name |
| :------ |
| `TOrFn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `maybeFn` | `TOrFn` |
| `...params` | `TOrFn` extends (...`params`: `any`[]) => `any` ? `Parameters`<`TOrFn`\> : [] |

#### Returns

`TOrFn` extends (...`params`: `any`[]) => `any` ? `ReturnType`<`TOrFn`\> : `TOrFn`

#### Defined in

[src/lib/utils/functions.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/functions.ts#L1)

___

### noop

▸ **noop**(`..._args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `..._args` | `any`[] |

#### Returns

`void`

#### Defined in

[src/lib/utils/runtime.ts:1](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/runtime.ts#L1)

___

### omit

▸ **omit**<`T`, `K`\>(`source`, `keys`): `Omit`<`T`, `K`\>

Return a new object containing the same keys of the input one, except from the ones specified in the exclusion
list.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `T` | An object. |
| `keys` | `K`[] | Keys to remove from the input object. |

#### Returns

`Omit`<`T`, `K`\>

#### Defined in

[src/lib/utils/objects.ts:7](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/objects.ts#L7)

___

### unpromisify

▸ **unpromisify**<`T`\>(`fn`): (...`args`: `Parameters`<`T`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `T` |

#### Returns

`fn`

▸ (`...args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<`T`\> |

##### Returns

`void`

#### Defined in

[src/lib/utils/promise.ts:3](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/utils/promise.ts#L3)
