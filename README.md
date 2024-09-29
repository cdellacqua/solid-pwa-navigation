# solid-pwa-navigation

A library that brings App-like navigation to PWAs and Web Apps.

This package provides routers that emulate Tab and Stack navigation behaviors.

[NPM Package](https://www.npmjs.com/package/solid-pwa-navigation)

`npm install solid-pwa-navigation`

[Documentation](./typedoc/README.md)

## Highlights

`<TabRouter />` is designed to handle navigation between pages that are always mounted. `<StackRouter />` is designed to mimic a
stack of cards, each new page is put on top of the others and going back removes (and destroys) that page.

You can combine them to obtain the classic app experience with a bottom drawer containing the main tabs and each tab having a
dedicated stack of pages.

To improve compatibility with modern mobile devices that have notches and other screen-obstructing elements, this library exports
a couple of utility components and objects that provide padding for the so-called "safe area", namely `<SafeAreaScreen>` and `safeAreaPaddingStyles`. This, together with `viewport-fit=cover` in the viewport meta-tag, will allow you to emulate the app experience as close as possible. You consult the demo for a fully configured example.

[Check out the demo here](https://cdellacqua.github.io/solid-pwa-navigation/)

[and the source code here](https://github.com/cdellacqua/solid-pwa-navigation/blob/main/src/demo.tsx)
