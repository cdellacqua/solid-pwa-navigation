[solid-pwa-navigation](../README.md) / components

# Module: components

## Table of contents

### Type Aliases

- [ClickableProps](components.md#clickableprops)
- [SafeAreaScreenProps](components.md#safeareascreenprops)
- [ScreenProps](components.md#screenprops)
- [ScrollAreaProps](components.md#scrollareaprops)

### Variables

- [safeAreaCSSVars](components.md#safeareacssvars)
- [safeAreaPaddingStyles](components.md#safeareapaddingstyles)
- [screenBackgroundCSSVar](components.md#screenbackgroundcssvar)

### Functions

- [Clickable](components.md#clickable)
- [SafeAreaScreen](components.md#safeareascreen)
- [Screen](components.md#screen)
- [ScrollArea](components.md#scrollarea)

## Type Aliases

### ClickableProps

Ƭ **ClickableProps**: `Omit`<`JSX.HTMLAttributes`<`HTMLDivElement`\>, ``"style"`` \| ``"onclick"`` \| ``"onKeyDown"`` \| ``"onkeydown"``\> & `AppearanceProps` & `RefProps`<`HTMLDivElement`\> & { `disabled?`: `boolean` ; `onClick?`: (`e`: `MouseEvent`) => `void`  }

#### Defined in

[src/lib/components/Clickable.tsx:4](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/Clickable.tsx#L4)

___

### SafeAreaScreenProps

Ƭ **SafeAreaScreenProps**: [`ScreenProps`](components.md#screenprops)

#### Defined in

[src/lib/components/SafeAreaScreen.tsx:6](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/SafeAreaScreen.tsx#L6)

___

### ScreenProps

Ƭ **ScreenProps**: `Omit`<`JSX.HTMLAttributes`<`HTMLDivElement`\>, ``"style"``\> & `AppearanceProps` & `RefProps`<`HTMLDivElement`\> & { `children?`: `JSXElement`  }

#### Defined in

[src/lib/components/Screen.tsx:6](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/Screen.tsx#L6)

___

### ScrollAreaProps

Ƭ **ScrollAreaProps**: `AppearanceProps` & `Omit`<`JSX.HTMLAttributes`<`HTMLDivElement`\>, ``"style"``\> & `RefProps`<`HTMLDivElement`\> & { `children?`: `JSXElement` ; `direction?`: ``"horizontal"`` \| ``"vertical"``  }

#### Defined in

[src/lib/components/ScrollArea.tsx:7](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/ScrollArea.tsx#L7)

## Variables

### safeAreaCSSVars

• `Const` **safeAreaCSSVars**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bottom` | `string` |
| `left` | `string` |
| `right` | `string` |
| `top` | `string` |

#### Defined in

[src/lib/components/SafeAreaScreen.tsx:8](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/SafeAreaScreen.tsx#L8)

___

### safeAreaPaddingStyles

• `Const` **safeAreaPaddingStyles**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `all` | { `padding-bottom`: `string` = safeAreaCSSVars.bottom; `padding-left`: `string` = safeAreaCSSVars.left; `padding-right`: `string` = safeAreaCSSVars.right; `padding-top`: `string` = safeAreaCSSVars.top } |
| `all.padding-bottom` | `string` |
| `all.padding-left` | `string` |
| `all.padding-right` | `string` |
| `all.padding-top` | `string` |
| `bottom` | { `padding-bottom`: `string` = safeAreaCSSVars.bottom } |
| `bottom.padding-bottom` | `string` |
| `horizontal` | { `padding-left`: `string` = safeAreaCSSVars.left; `padding-right`: `string` = safeAreaCSSVars.right } |
| `horizontal.padding-left` | `string` |
| `horizontal.padding-right` | `string` |
| `left` | { `padding-left`: `string` = safeAreaCSSVars.left } |
| `left.padding-left` | `string` |
| `right` | { `padding-right`: `string` = safeAreaCSSVars.right } |
| `right.padding-right` | `string` |
| `top` | { `padding-top`: `string` = safeAreaCSSVars.top } |
| `top.padding-top` | `string` |
| `vertical` | { `padding-bottom`: `string` = safeAreaCSSVars.bottom; `padding-top`: `string` = safeAreaCSSVars.top } |
| `vertical.padding-bottom` | `string` |
| `vertical.padding-top` | `string` |

#### Defined in

[src/lib/components/SafeAreaScreen.tsx:15](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/SafeAreaScreen.tsx#L15)

___

### screenBackgroundCSSVar

• `Const` **screenBackgroundCSSVar**: ``"var(--solid-pwa-navigation-view-bg, #fafafa)"``

#### Defined in

[src/lib/components/Screen.tsx:12](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/Screen.tsx#L12)

## Functions

### Clickable

▸ **Clickable**(`props_`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props_` | [`ClickableProps`](components.md#clickableprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/components/Clickable.tsx:11](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/Clickable.tsx#L11)

___

### SafeAreaScreen

▸ **SafeAreaScreen**(`props_`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props_` | [`ScreenProps`](components.md#screenprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/components/SafeAreaScreen.tsx:44](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/SafeAreaScreen.tsx#L44)

___

### Screen

▸ **Screen**(`props_`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props_` | [`ScreenProps`](components.md#screenprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/components/Screen.tsx:14](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/Screen.tsx#L14)

___

### ScrollArea

▸ **ScrollArea**(`props_`): `JSXElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props_` | [`ScrollAreaProps`](components.md#scrollareaprops) |

#### Returns

`JSXElement`

#### Defined in

[src/lib/components/ScrollArea.tsx:14](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/components/ScrollArea.tsx#L14)
