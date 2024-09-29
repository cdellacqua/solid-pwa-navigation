[solid-pwa-navigation](../README.md) / navigation

# Module: navigation

## Table of contents

### Functions

- [useBackKeyNavigation](navigation.md#usebackkeynavigation)
- [useBeforeUnloadConfirmationPrompt](navigation.md#usebeforeunloadconfirmationprompt)
- [useHistoryPopStateListener](navigation.md#usehistorypopstatelistener)

## Functions

### useBackKeyNavigation

▸ **useBackKeyNavigation**(`listener`, `disabled?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | () => `void` |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/navigation/back-navigation.ts:4](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/navigation/back-navigation.ts#L4)

___

### useBeforeUnloadConfirmationPrompt

▸ **useBeforeUnloadConfirmationPrompt**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/navigation/unload-prompt.ts:4](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/navigation/unload-prompt.ts#L4)

___

### useHistoryPopStateListener

▸ **useHistoryPopStateListener**(`listener`, `disabled?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | () => `void` |
| `disabled?` | [`MaybeAccessor`](solid_extra.md#maybeaccessor)<`boolean`\> |

#### Returns

`void`

#### Defined in

[src/lib/navigation/back-navigation.ts:20](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/navigation/back-navigation.ts#L20)
