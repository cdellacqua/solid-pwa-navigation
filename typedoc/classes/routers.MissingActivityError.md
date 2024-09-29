[solid-pwa-navigation](../README.md) / [routers](../modules/routers.md) / MissingActivityError

# Class: MissingActivityError

[routers](../modules/routers.md).MissingActivityError

## Hierarchy

- `Error`

  ↳ **`MissingActivityError`**

## Table of contents

### Constructors

- [constructor](routers.MissingActivityError.md#constructor)

### Properties

- [cause](routers.MissingActivityError.md#cause)
- [message](routers.MissingActivityError.md#message)
- [name](routers.MissingActivityError.md#name)
- [stack](routers.MissingActivityError.md#stack)
- [prepareStackTrace](routers.MissingActivityError.md#preparestacktrace)
- [stackTraceLimit](routers.MissingActivityError.md#stacktracelimit)

### Methods

- [captureStackTrace](routers.MissingActivityError.md#capturestacktrace)

## Constructors

### constructor

• **new MissingActivityError**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/routers/stack/StackRouter.tsx:27](https://gitlab.com/cdellacqua/solid-pwa-navigation/-/blob/main/src/lib/routers/stack/StackRouter.tsx#L27)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
