[solid-pwa-navigation](../README.md) / default

# Module: default

## Table of contents

### Type Aliases

- [AnimatedStackScreenProps](default.md#animatedstackscreenprops)
- [AnimatedTabScreenProps](default.md#animatedtabscreenprops)
- [ModalStackScreenProps](default.md#modalstackscreenprops)
- [StackPageProps](default.md#stackpageprops)
- [TabPageProps](default.md#tabpageprops)

### Variables

- [draggableAreaSize](default.md#draggableareasize)

### Functions

- [AnimatedStackScreen](default.md#animatedstackscreen)
- [AnimatedTabScreen](default.md#animatedtabscreen)
- [ArrowLeft](default.md#arrowleft)
- [ModalStackScreen](default.md#modalstackscreen)
- [StackPage](default.md#stackpage)
- [TabPage](default.md#tabpage)

## Type Aliases

### AnimatedStackScreenProps

Ƭ **AnimatedStackScreenProps**: [`AppearanceProps`](solid_extra.md#appearanceprops) & [`DataAttributesProps`](solid_extra.md#dataattributesprops) & [`AriaAttributesProps`](solid_extra.md#ariaattributesprops) & { `children`: `JSXElement` ; `draggable?`: `boolean` ; `draggableAreaSize?`: `number` ; `outro?`: ``"translateX"`` \| ``"translateZ"``  }

#### Defined in

[src/lib/default/AnimatedStackScreen.tsx:10](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/AnimatedStackScreen.tsx#L10)

___

### AnimatedTabScreenProps

Ƭ **AnimatedTabScreenProps**: [`AppearanceProps`](solid_extra.md#appearanceprops) & [`DataAttributesProps`](solid_extra.md#dataattributesprops) & [`AriaAttributesProps`](solid_extra.md#ariaattributesprops) & { `children`: `JSXElement` ; `draggable?`: `boolean` ; `draggableAreaSize?`: `number`  }

#### Defined in

[src/lib/default/AnimatedTabScreen.tsx:15](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/AnimatedTabScreen.tsx#L15)

___

### ModalStackScreenProps

Ƭ **ModalStackScreenProps**: [`AppearanceProps`](solid_extra.md#appearanceprops) & [`DataAttributesProps`](solid_extra.md#dataattributesprops) & [`AriaAttributesProps`](solid_extra.md#ariaattributesprops) & { `children`: `JSXElement` ; `title?`: `JSXElement`  }

#### Defined in

[src/lib/default/ModalStackScreen.tsx:12](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/ModalStackScreen.tsx#L12)

___

### StackPageProps

Ƭ **StackPageProps**: [`AppearanceProps`](solid_extra.md#appearanceprops) & [`DataAttributesProps`](solid_extra.md#dataattributesprops) & [`AriaAttributesProps`](solid_extra.md#ariaattributesprops) & [`AnimatedStackScreenProps`](default.md#animatedstackscreenprops) & { `children`: `JSXElement` ; `scrollAreaAppearance?`: [`AppearanceProps`](solid_extra.md#appearanceprops) ; `title?`: `JSXElement`  }

#### Defined in

[src/lib/default/StackPage.tsx:13](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/StackPage.tsx#L13)

___

### TabPageProps

Ƭ **TabPageProps**: [`AppearanceProps`](solid_extra.md#appearanceprops) & [`DataAttributesProps`](solid_extra.md#dataattributesprops) & [`AriaAttributesProps`](solid_extra.md#ariaattributesprops) & { `children`: `JSXElement` ; `scrollAreaAppearance?`: [`AppearanceProps`](solid_extra.md#appearanceprops) ; `title?`: `JSXElement`  }

#### Defined in

[src/lib/default/TabPage.tsx:9](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/TabPage.tsx#L9)

## Variables

### draggableAreaSize

• `Const` **draggableAreaSize**: ``12``

#### Defined in

[src/lib/default/thresholds.ts:1](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/thresholds.ts#L1)

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

[src/lib/default/AnimatedStackScreen.tsx:21](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/AnimatedStackScreen.tsx#L21)

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

[src/lib/default/AnimatedTabScreen.tsx:25](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/AnimatedTabScreen.tsx#L25)

___

### ArrowLeft

▸ **ArrowLeft**(): `JSXElement`

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/ArrowLeft.tsx:3](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/ArrowLeft.tsx#L3)

___

### ModalStackScreen

▸ **ModalStackScreen**(`props`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ModalStackScreenProps`](default.md#modalstackscreenprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/default/ModalStackScreen.tsx:19](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/ModalStackScreen.tsx#L19)

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

[src/lib/default/StackPage.tsx:22](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/StackPage.tsx#L22)

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

[src/lib/default/TabPage.tsx:17](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/lib/default/TabPage.tsx#L17)
