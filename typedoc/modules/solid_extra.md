[solid-pwa-navigation](../README.md) / solid-extra

# Module: solid-extra

## Table of contents

### Type Aliases

- [AppearanceProps](solid_extra.md#appearanceprops)
- [AriaAttributesProps](solid_extra.md#ariaattributesprops)
- [DataAttributesProps](solid_extra.md#dataattributesprops)
- [MaybeAccessor](solid_extra.md#maybeaccessor)
- [NodeRef](solid_extra.md#noderef)
- [RefProps](solid_extra.md#refprops)
- [SimpleSetter](solid_extra.md#simplesetter)

### Functions

- [access](solid_extra.md#access)
- [propagateRef](solid_extra.md#propagateref)
- [splitPropsAriaProps](solid_extra.md#splitpropsariaprops)
- [splitPropsByPrefix](solid_extra.md#splitpropsbyprefix)
- [splitPropsDataProps](solid_extra.md#splitpropsdataprops)
- [track](solid_extra.md#track)
- [useEventListener](solid_extra.md#useeventlistener)
- [useLayoutTick](solid_extra.md#uselayouttick)
- [useTick](solid_extra.md#usetick)

## Type Aliases

### AppearanceProps

Ƭ **AppearanceProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `class?` | `string` |
| `classList?` | { `[k: string]`: `boolean` \| `undefined`;  } |
| `style?` | `JSX.CSSProperties` |

#### Defined in

[src/lib/solid-extra/appearance.ts:3](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/appearance.ts#L3)

___

### AriaAttributesProps

Ƭ **AriaAttributesProps**: `Record`<\`aria-${string}\`, `string` \| `number` \| `boolean`\>

#### Defined in

[src/lib/solid-extra/props.ts:24](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/props.ts#L24)

___

### DataAttributesProps

Ƭ **DataAttributesProps**: `Record`<\`data-${string}\`, `string` \| `number` \| `boolean`\>

#### Defined in

[src/lib/solid-extra/props.ts:23](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/props.ts#L23)

___

### MaybeAccessor

Ƭ **MaybeAccessor**<`T`\>: `Accessor`<`T`\> \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/solid-extra/reactivity.ts:4](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/reactivity.ts#L4)

___

### NodeRef

Ƭ **NodeRef**<`T`\>: `T` \| `undefined` \| (`el`: `T` \| `undefined`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/solid-extra/refs.ts:1](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/refs.ts#L1)

___

### RefProps

Ƭ **RefProps**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ref?` | [`NodeRef`](solid_extra.md#noderef)<`T`\> |

#### Defined in

[src/lib/solid-extra/refs.ts:2](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/refs.ts#L2)

___

### SimpleSetter

Ƭ **SimpleSetter**<`T`\>: (`x`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`x`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `T` |

##### Returns

`void`

#### Defined in

[src/lib/solid-extra/reactivity.ts:18](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/reactivity.ts#L18)

## Functions

### access

▸ **access**<`T`\>(`value`, `owner?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`T`\> |
| `owner?` | ``null`` \| `Owner` |

#### Returns

`T`

#### Defined in

[src/lib/solid-extra/reactivity.ts:6](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/reactivity.ts#L6)

___

### propagateRef

▸ **propagateRef**<`T`\>(`refContent`, `props?`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refContent` | `undefined` \| `T` |
| `props?` | [`RefProps`](solid_extra.md#refprops)<`T`\> |

#### Returns

`void`

#### Defined in

[src/lib/solid-extra/refs.ts:4](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/refs.ts#L4)

___

### splitPropsAriaProps

▸ **splitPropsAriaProps**<`T`\>(`props`): [`Pick`<`T`, keyof `T` & keyof [`AriaAttributesProps`](solid_extra.md#ariaattributesprops)\>, `Exclude`<`T`, keyof `T` & keyof [`AriaAttributesProps`](solid_extra.md#ariaattributesprops)\>]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `T` |

#### Returns

[`Pick`<`T`, keyof `T` & keyof [`AriaAttributesProps`](solid_extra.md#ariaattributesprops)\>, `Exclude`<`T`, keyof `T` & keyof [`AriaAttributesProps`](solid_extra.md#ariaattributesprops)\>]

#### Defined in

[src/lib/solid-extra/props.ts:26](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/props.ts#L26)

___

### splitPropsByPrefix

▸ **splitPropsByPrefix**<`T`, `Prefix`\>(`props`, `prefix`): [`Pick`<`T`, keyof `T` & \`${Prefix}${string}\`\>, `Exclude`<`T`, keyof `T` & \`${Prefix}${string}\`\>]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Prefix` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `T` |
| `prefix` | `Prefix` |

#### Returns

[`Pick`<`T`, keyof `T` & \`${Prefix}${string}\`\>, `Exclude`<`T`, keyof `T` & \`${Prefix}${string}\`\>]

#### Defined in

[src/lib/solid-extra/props.ts:1](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/props.ts#L1)

___

### splitPropsDataProps

▸ **splitPropsDataProps**<`T`\>(`props`): [`Pick`<`T`, keyof `T` & keyof [`DataAttributesProps`](solid_extra.md#dataattributesprops)\>, `Exclude`<`T`, keyof `T` & keyof [`DataAttributesProps`](solid_extra.md#dataattributesprops)\>]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `T` |

#### Returns

[`Pick`<`T`, keyof `T` & keyof [`DataAttributesProps`](solid_extra.md#dataattributesprops)\>, `Exclude`<`T`, keyof `T` & keyof [`DataAttributesProps`](solid_extra.md#dataattributesprops)\>]

#### Defined in

[src/lib/solid-extra/props.ts:32](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/props.ts#L32)

___

### track

▸ **track**(`...value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...value` | `any`[] |

#### Returns

`void`

#### Defined in

[src/lib/solid-extra/reactivity.ts:14](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/reactivity.ts#L14)

___

### useEventListener

▸ **useEventListener**<`Target`, `K`\>(`target`, `name`, `callback`, `opts?`, `disabled?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `HTMLElement`<`Target`\> |
| `K` | extends keyof `HTMLElementEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| ``null`` \| `Target`\> |
| `name` | `K` |
| `callback` | (`e`: `HTMLElementEventMap`[`K`]) => `void` |
| `opts?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| `AddEventListenerOptions`\> |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/solid-extra/event-listener.ts:5](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/event-listener.ts#L5)

▸ **useEventListener**<`Target`, `K`\>(`target`, `name`, `callback`, `opts?`, `disabled?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `Document`<`Target`\> |
| `K` | extends keyof `DocumentEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| ``null`` \| `Target`\> |
| `name` | `K` |
| `callback` | (`e`: `DocumentEventMap`[`K`]) => `void` |
| `opts?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| `AddEventListenerOptions`\> |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/solid-extra/event-listener.ts:12](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/event-listener.ts#L12)

▸ **useEventListener**<`Target`, `K`\>(`target`, `name`, `callback`, `opts?`, `disabled?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `Window`<`Target`\> |
| `K` | extends keyof `WindowEventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| ``null`` \| `Target`\> |
| `name` | `K` |
| `callback` | (`e`: `WindowEventMap`[`K`]) => `void` |
| `opts?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| `AddEventListenerOptions`\> |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/solid-extra/event-listener.ts:19](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/event-listener.ts#L19)

▸ **useEventListener**<`Target`, `K`\>(`target`, `name`, `callback`, `opts?`, `disabled?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `HTMLElement` \| `Document` \| `Window` |
| `K` | extends ``"abort"`` \| ``"animationcancel"`` \| ``"animationend"`` \| ``"animationiteration"`` \| ``"animationstart"`` \| ``"auxclick"`` \| ``"beforeinput"`` \| ``"blur"`` \| ``"cancel"`` \| ``"canplay"`` \| ``"canplaythrough"`` \| ``"change"`` \| ``"click"`` \| ``"close"`` \| ``"compositionend"`` \| ``"compositionstart"`` \| ``"compositionupdate"`` \| ``"contextmenu"`` \| ``"cuechange"`` \| ``"dblclick"`` \| ``"drag"`` \| ``"dragend"`` \| ``"dragenter"`` \| ``"dragleave"`` \| ``"dragover"`` \| ``"dragstart"`` \| ``"drop"`` \| ``"durationchange"`` \| ``"emptied"`` \| ``"ended"`` \| ``"error"`` \| ``"focus"`` \| ``"focusin"`` \| ``"focusout"`` \| ``"formdata"`` \| ``"gotpointercapture"`` \| ``"input"`` \| ``"invalid"`` \| ``"keydown"`` \| ``"keypress"`` \| ``"keyup"`` \| ``"load"`` \| ``"loadeddata"`` \| ``"loadedmetadata"`` \| ``"loadstart"`` \| ``"lostpointercapture"`` \| ``"mousedown"`` \| ``"mouseenter"`` \| ``"mouseleave"`` \| ``"mousemove"`` \| ``"mouseout"`` \| ``"mouseover"`` \| ``"mouseup"`` \| ``"pause"`` \| ``"play"`` \| ``"playing"`` \| ``"pointercancel"`` \| ``"pointerdown"`` \| ``"pointerenter"`` \| ``"pointerleave"`` \| ``"pointermove"`` \| ``"pointerout"`` \| ``"pointerover"`` \| ``"pointerup"`` \| ``"progress"`` \| ``"ratechange"`` \| ``"reset"`` \| ``"resize"`` \| ``"scroll"`` \| ``"securitypolicyviolation"`` \| ``"seeked"`` \| ``"seeking"`` \| ``"select"`` \| ``"selectionchange"`` \| ``"selectstart"`` \| ``"slotchange"`` \| ``"stalled"`` \| ``"submit"`` \| ``"suspend"`` \| ``"timeupdate"`` \| ``"toggle"`` \| ``"touchcancel"`` \| ``"touchend"`` \| ``"touchmove"`` \| ``"touchstart"`` \| ``"transitioncancel"`` \| ``"transitionend"`` \| ``"transitionrun"`` \| ``"transitionstart"`` \| ``"volumechange"`` \| ``"waiting"`` \| ``"webkitanimationend"`` \| ``"webkitanimationiteration"`` \| ``"webkitanimationstart"`` \| ``"webkittransitionend"`` \| ``"wheel"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| ``null`` \| `Target`\> |
| `name` | `K` |
| `callback` | (`e`: `HTMLElementEventMap` \| `DocumentEventMap` \| `WindowEventMap`[`K`]) => `void` |
| `opts?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`undefined` \| `AddEventListenerOptions`\> |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/solid-extra/event-listener.ts:26](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/event-listener.ts#L26)

___

### useLayoutTick

▸ **useLayoutTick**(): (`params?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\>

#### Returns

`fn`

▸ (`params?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `Object` |
| `params.signal?` | `AbortSignal` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/solid-extra/lifecycle.ts:5](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/lifecycle.ts#L5)

___

### useTick

▸ **useTick**(): (`params?`: { `signal?`: `AbortSignal`  }) => `Promise`<`void`\>

#### Returns

`fn`

▸ (`params?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `Object` |
| `params.signal?` | `AbortSignal` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/solid-extra/lifecycle.ts:5](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/solid-extra/lifecycle.ts#L5)
