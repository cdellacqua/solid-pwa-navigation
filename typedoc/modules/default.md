[solid-pwa-navigation](../README.md) / default

# Module: default

## Table of contents

### Type Aliases

- [AnimatedStackScreenProps](default.md#animatedstackscreenprops)
- [AnimatedTabScreenProps](default.md#animatedtabscreenprops)
- [ModalStackScreenProps](default.md#modalstackscreenprops)
- [StackPageProps](default.md#stackpageprops)
- [TabPageProps](default.md#tabpageprops)

### Functions

- [AnimatedStackScreen](default.md#animatedstackscreen)
- [AnimatedTabScreen](default.md#animatedtabscreen)
- [ArrowLeft](default.md#arrowleft)
- [ModalStackScreen](default.md#modalstackscreen)
- [StackPage](default.md#stackpage)
- [TabPage](default.md#tabpage)

## Type Aliases

### AnimatedStackScreenProps

Ƭ **AnimatedStackScreenProps**: `AppearanceProps` & { `children`: `JSXElement` ; `draggable?`: `boolean` ; `outro?`: ``"translateX"`` \| ``"translateZ"``  }

#### Defined in

[src/lib/default/AnimatedStackScreen.tsx:8](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/AnimatedStackScreen.tsx#L8)

___

### AnimatedTabScreenProps

Ƭ **AnimatedTabScreenProps**: `AppearanceProps` & { `children`: `JSXElement` ; `draggable?`: `boolean`  }

#### Defined in

[src/lib/default/AnimatedTabScreen.tsx:8](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/AnimatedTabScreen.tsx#L8)

___

### ModalStackScreenProps

Ƭ **ModalStackScreenProps**: `AppearanceProps` & { `children`: `JSXElement` ; `swipeActiveRegionLength?`: `number` ; `title?`: `JSXElement`  }

#### Defined in

[src/lib/default/ModalStackScreen.tsx:13](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/ModalStackScreen.tsx#L13)

___

### StackPageProps

Ƭ **StackPageProps**: `AppearanceProps` & [`AnimatedStackScreenProps`](default.md#animatedstackscreenprops) & { `children`: `JSXElement` ; `scrollAreaAppearance?`: `AppearanceProps` ; `title?`: `JSXElement`  }

#### Defined in

[src/lib/default/StackPage.tsx:11](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/StackPage.tsx#L11)

___

### TabPageProps

Ƭ **TabPageProps**: `AppearanceProps` & { `children`: `JSXElement` ; `scrollAreaAppearance?`: `AppearanceProps` ; `title?`: `JSXElement`  }

#### Defined in

[src/lib/default/TabPage.tsx:7](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/TabPage.tsx#L7)

## Functions

### AnimatedStackScreen

▸ **AnimatedStackScreen**(`props`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AnimatedStackScreenProps`](default.md#animatedstackscreenprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/AnimatedStackScreen.tsx:15](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/AnimatedStackScreen.tsx#L15)

___

### AnimatedTabScreen

▸ **AnimatedTabScreen**(`props`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AnimatedTabScreenProps`](default.md#animatedtabscreenprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/AnimatedTabScreen.tsx:14](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/AnimatedTabScreen.tsx#L14)

___

### ArrowLeft

▸ **ArrowLeft**(): `JSXElement`

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/ArrowLeft.tsx:3](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/ArrowLeft.tsx#L3)

___

### ModalStackScreen

▸ **ModalStackScreen**(`props_`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props_` | [`ModalStackScreenProps`](default.md#modalstackscreenprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/ModalStackScreen.tsx:19](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/ModalStackScreen.tsx#L19)

___

### StackPage

▸ **StackPage**(`props`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`StackPageProps`](default.md#stackpageprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/StackPage.tsx:18](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/StackPage.tsx#L18)

___

### TabPage

▸ **TabPage**(`props`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TabPageProps`](default.md#tabpageprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/TabPage.tsx:13](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/default/TabPage.tsx#L13)
