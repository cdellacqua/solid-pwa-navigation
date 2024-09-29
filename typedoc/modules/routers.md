[solid-pwa-navigation](../README.md) / routers

# Module: routers

## Table of contents

### Classes

- [MissingActivityError](../classes/routers.MissingActivityError.md)
- [MissingStackRouterError](../classes/routers.MissingStackRouterError.md)
- [MissingTabRouterError](../classes/routers.MissingTabRouterError.md)

### Type Aliases

- [Activity](routers.md#activity)
- [ActivityStackRouterContextContent](routers.md#activitystackroutercontextcontent)
- [ActivityTabRouterContextContent](routers.md#activitytabroutercontextcontent)
- [StackRouterContextContent](routers.md#stackroutercontextcontent)
- [StackRouterProps](routers.md#stackrouterprops)
- [Tab](routers.md#tab)
- [TabRouterContextContent](routers.md#tabroutercontextcontent)
- [TabRouterProps](routers.md#tabrouterprops)

### Variables

- [StackRouterContext](routers.md#stackroutercontext)
- [TabRouterContext](routers.md#tabroutercontext)
- [stackRouterBackgroundCSSVar](routers.md#stackrouterbackgroundcssvar)
- [tabRouterBackgroundCSSVar](routers.md#tabrouterbackgroundcssvar)

### Functions

- [StackRouter](routers.md#stackrouter)
- [TabRouter](routers.md#tabrouter)
- [buildActivity](routers.md#buildactivity)
- [makeLifecycleHooks](routers.md#makelifecyclehooks)
- [useStackRouter](routers.md#usestackrouter)
- [useStackRouterAfterPause](routers.md#usestackrouterafterpause)
- [useStackRouterAfterResume](routers.md#usestackrouterafterresume)
- [useStackRouterBeforePause](routers.md#usestackrouterbeforepause)
- [useStackRouterBeforeResume](routers.md#usestackrouterbeforeresume)
- [useTabRouter](routers.md#usetabrouter)
- [useTabRouterAfterPause](routers.md#usetabrouterafterpause)
- [useTabRouterAfterResume](routers.md#usetabrouterafterresume)
- [useTabRouterBeforePause](routers.md#usetabrouterbeforepause)
- [useTabRouterBeforeResume](routers.md#usetabrouterbeforeresume)

## Type Aliases

### Activity

Ƭ **Activity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `callbacks` | { `onAfterPauseCbs?`: () => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] ; `onAfterResumeCbs?`: (`returnValue`: `unknown`) => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] ; `onBeforePauseCbs?`: () => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] ; `onBeforeResumeCbs?`: (`returnValue`: `unknown`) => [`MaybePromise`](utils.md#maybepromise)<`void`\>[]  } |
| `callbacks.onAfterPauseCbs?` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] |
| `callbacks.onAfterResumeCbs?` | (`returnValue`: `unknown`) => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] |
| `callbacks.onBeforePauseCbs?` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] |
| `callbacks.onBeforeResumeCbs?` | (`returnValue`: `unknown`) => [`MaybePromise`](utils.md#maybepromise)<`void`\>[] |
| `dispose` | () => `void` |
| `focus` | () => `void` |
| `id` | `string` |
| `isActive` | `Accessor`<`boolean`\> |
| `render` | () => `void` |
| `root` | `HTMLElement` |

#### Defined in

[src/lib/routers/activity.tsx:7](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L7)

___

### ActivityStackRouterContextContent

Ƭ **ActivityStackRouterContextContent**: [`StackRouterContextContent`](routers.md#stackroutercontextcontent) & { `activityId`: `string`  }

#### Defined in

[src/lib/routers/stack/context.ts:17](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/context.ts#L17)

___

### ActivityTabRouterContextContent

Ƭ **ActivityTabRouterContextContent**<`TabName`\>: [`TabRouterContextContent`](routers.md#tabroutercontextcontent)<`TabName`\> & { `activityId`: `string` ; `activityName`: `TabName`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TabName` | extends `string` |

#### Defined in

[src/lib/routers/tab/context.ts:19](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/context.ts#L19)

___

### StackRouterContextContent

Ƭ **StackRouterContextContent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `activities` | `Accessor`<[`Activity`](routers.md#activity)[]\> |
| `busy` | `Accessor`<`boolean`\> |
| `continuousStackIndex` | `Accessor`<`number`\> |
| `setContinuousStackIndex` | `Setter`<`number`\> |
| `spring$` | `SpringStore`<`number`\> |
| `pop` | (`opts?`: { `count?`: `number` ; `returnValue?`: `unknown`  }) => `Promise`<`void`\> |
| `push` | (`component`: [`MaybeArray`](utils.md#maybearray)<`Component`<`void`\>\>) => `Promise`<`void`\> |

#### Defined in

[src/lib/routers/stack/context.ts:7](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/context.ts#L7)

___

### StackRouterProps

Ƭ **StackRouterProps**: `AppearanceProps` & { `entryPoint`: [`MaybeArray`](utils.md#maybearray)<`Component`<`void`\>\> ; `ctxRef?`: (`ctx`: [`StackRouterContextContent`](routers.md#stackroutercontextcontent)) => `void`  }

#### Defined in

[src/lib/routers/stack/StackRouter.tsx:32](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/StackRouter.tsx#L32)

___

### Tab

Ƭ **Tab**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `activity` | [`Activity`](routers.md#activity) |
| `component` | `Component`<`void`\> |
| `index` | `number` |

#### Defined in

[src/lib/routers/tab/context.ts:6](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/context.ts#L6)

___

### TabRouterContextContent

Ƭ **TabRouterContextContent**<`TabName`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TabName` | extends `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `activeTabName` | `Accessor`<`TabName`\> |
| `busy` | `Accessor`<`boolean`\> |
| `continuousTabIndex` | `Accessor`<`number`\> |
| `setContinuousTabIndex` | `Setter`<`number`\> |
| `spring$` | `SpringStore`<`number`\> |
| `goToTab` | (`name`: `TabName`, `opts?`: { `returnValue?`: `unknown`  }) => `Promise`<`void`\> |
| `tabNames` | () => `TabName`[] |
| `tabs` | () => `Partial`<`Record`<`TabName`, [`Tab`](routers.md#tab)\>\> |

#### Defined in

[src/lib/routers/tab/context.ts:8](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/context.ts#L8)

___

### TabRouterProps

Ƭ **TabRouterProps**<`Tabs`\>: `AppearanceProps` & { `initialTab`: keyof `Tabs` & `string` ; `tabs`: `Tabs` ; `ctxRef?`: (`ctx`: [`TabRouterContextContent`](routers.md#tabroutercontextcontent)<keyof `Tabs` & `string`\>) => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Tabs` | extends `Record`<`string`, `Component`<`void`\>\> |

#### Defined in

[src/lib/routers/tab/TabRouter.tsx:16](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/TabRouter.tsx#L16)

## Variables

### StackRouterContext

• `Const` **StackRouterContext**: `Context`<``null`` \| [`ActivityStackRouterContextContent`](routers.md#activitystackroutercontextcontent)\>

#### Defined in

[src/lib/routers/stack/context.ts:21](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/context.ts#L21)

___

### TabRouterContext

• `Const` **TabRouterContext**: `Context`<``null`` \| [`ActivityTabRouterContextContent`](routers.md#activitytabroutercontextcontent)<`string`\>\>

#### Defined in

[src/lib/routers/tab/context.ts:24](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/context.ts#L24)

___

### stackRouterBackgroundCSSVar

• `Const` **stackRouterBackgroundCSSVar**: ``"var(--solid-pwa-navigation-router-bg, black)"``

#### Defined in

[src/lib/routers/stack/StackRouter.tsx:279](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/StackRouter.tsx#L279)

___

### tabRouterBackgroundCSSVar

• `Const` **tabRouterBackgroundCSSVar**: ``"var(--solid-pwa-navigation-router-bg, black)"``

#### Defined in

[src/lib/routers/tab/TabRouter.tsx:290](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/TabRouter.tsx#L290)

## Functions

### StackRouter

▸ **StackRouter**(`props`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`StackRouterProps`](routers.md#stackrouterprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/routers/stack/StackRouter.tsx:93](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/StackRouter.tsx#L93)

___

### TabRouter

▸ **TabRouter**<`Tabs`\>(`props`): `JSXElement`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Tabs` | extends `Record`<`string`, `Component`<`void`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TabRouterProps`](routers.md#tabrouterprops)<`Tabs`\> |

#### Returns

`JSXElement`

#### Defined in

[src/lib/routers/tab/TabRouter.tsx:97](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/TabRouter.tsx#L97)

___

### buildActivity

▸ **buildActivity**(`«destructured»`): [`Activity`](routers.md#activity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `component` | `Component`<{ `activityId`: `string`  }\> |
| › `isActive` | `Accessor`<`boolean`\> |
| › `mountPoint` | `HTMLElement` |

#### Returns

[`Activity`](routers.md#activity)

#### Defined in

[src/lib/routers/activity.tsx:36](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L36)

___

### makeLifecycleHooks

▸ **makeLifecycleHooks**(`activityFinder`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `activityFinder` | () => [`Activity`](routers.md#activity) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `useAfterPause` | (`cb`: () => [`MaybePromise`](utils.md#maybepromise)<`void`\>) => `void` |
| `useAfterResume` | (`cb`: () => [`MaybePromise`](utils.md#maybepromise)<`void`\>) => `void` |
| `useBeforePause` | (`cb`: () => [`MaybePromise`](utils.md#maybepromise)<`void`\>) => `void` |
| `useBeforeResume` | (`cb`: () => [`MaybePromise`](utils.md#maybepromise)<`void`\>) => `void` |

#### Defined in

[src/lib/routers/activity.tsx:96](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L96)

___

### useStackRouter

▸ **useStackRouter**(): `Omit`<[`StackRouterContextContent`](routers.md#stackroutercontextcontent), ``"setContinuousStackIndex"`` \| ``"spring$"``\> & { `activityStackIndex`: `number` ; `inRatio`: `Accessor`<`number`\> ; `isActive`: `Accessor`<`boolean`\> ; `outRatio`: `Accessor`<`number`\> ; `setOutRatio`: `SimpleSetter`<`number`\> ; `resetOutRatio`: () => `Promise`<`void`\>  }

#### Returns

`Omit`<[`StackRouterContextContent`](routers.md#stackroutercontextcontent), ``"setContinuousStackIndex"`` \| ``"spring$"``\> & { `activityStackIndex`: `number` ; `inRatio`: `Accessor`<`number`\> ; `isActive`: `Accessor`<`boolean`\> ; `outRatio`: `Accessor`<`number`\> ; `setOutRatio`: `SimpleSetter`<`number`\> ; `resetOutRatio`: () => `Promise`<`void`\>  }

#### Defined in

[src/lib/routers/stack/StackRouter.tsx:37](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/StackRouter.tsx#L37)

___

### useStackRouterAfterPause

▸ **useStackRouterAfterPause**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:97](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L97)

___

### useStackRouterAfterResume

▸ **useStackRouterAfterResume**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:99](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L99)

___

### useStackRouterBeforePause

▸ **useStackRouterBeforePause**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:98](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L98)

___

### useStackRouterBeforeResume

▸ **useStackRouterBeforeResume**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:100](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L100)

___

### useTabRouter

▸ **useTabRouter**(): `Omit`<[`TabRouterContextContent`](routers.md#tabroutercontextcontent)<`string`\>, ``"setContinuousTabIndex"`` \| ``"spring$"``\> & { `activityTabIndex`: `Accessor`<`number`\> ; `inRatio`: `Accessor`<`number`\> ; `isActive`: `Accessor`<`boolean`\> ; `outRatio`: `Accessor`<`number`\> ; `setOutRatio`: `SimpleSetter`<`number`\> ; `resetOutRatio`: () => `Promise`<`void`\>  }

#### Returns

`Omit`<[`TabRouterContextContent`](routers.md#tabroutercontextcontent)<`string`\>, ``"setContinuousTabIndex"`` \| ``"spring$"``\> & { `activityTabIndex`: `Accessor`<`number`\> ; `inRatio`: `Accessor`<`number`\> ; `isActive`: `Accessor`<`boolean`\> ; `outRatio`: `Accessor`<`number`\> ; `setOutRatio`: `SimpleSetter`<`number`\> ; `resetOutRatio`: () => `Promise`<`void`\>  }

#### Defined in

[src/lib/routers/tab/TabRouter.tsx:28](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/tab/TabRouter.tsx#L28)

___

### useTabRouterAfterPause

▸ **useTabRouterAfterPause**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:97](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L97)

___

### useTabRouterAfterResume

▸ **useTabRouterAfterResume**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:99](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L99)

___

### useTabRouterBeforePause

▸ **useTabRouterBeforePause**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:98](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L98)

___

### useTabRouterBeforeResume

▸ **useTabRouterBeforeResume**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => [`MaybePromise`](utils.md#maybepromise)<`void`\> |

#### Returns

`void`

#### Defined in

[src/lib/routers/activity.tsx:100](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/activity.tsx#L100)
