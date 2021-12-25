<div align="center">

# 💬 react-customizable-popup

[![NPM version](https://img.shields.io/npm/v/react-customizable-popup)](https://www.npmjs.com/package/react-customizable-popup) ![NPM size](https://img.shields.io/bundlephobia/min/react-customizable-popup?label=size&color=ff69b4) [![MIT License](https://img.shields.io/github/license/ColinLienard/react-customizable-popup?color=brightgreen)](LICENSE)

A simple and easy to use react library to create [fully customizable](#-documentation) popups.

</div>

---

## 📋 Table of content

- ✨ [Features](#-features)
- 🔎 [Example](#-example)
- 🚚 [Installation](#-installation)
- 📚 [Documentation](#-documentation)
  - [Usage](#Usage)
  - [Props](#Props)
    - [`root`](#root)
    - [`toggler`](#toggler)
    - [`toggleOn`](#toggleon)
    - [`position`](#position)
    - [`noScroll`](#noscroll)
    - [`fixed`](#fixed)
    - [`arrow`](#arrow)
    - [`arrowSize`](#arrowsize)
    - [`backdrop`](#backdrop)
    - [`className`](#classname)
    - [`backdropClassName`](#backdropclassname)
    - [`distanceFromToggler`](#distancefromtoggler)
    - [`onOpen`](#onopen)
    - [`onClose`](#onclose)
  - [Styling](#styling)
    - [Applying styles](#applying-styles)
    - [Applying animations](#applying-animations)
- 📄 [License](#-license)

## ✨ Features

- **Easy** to use
- Fully **customizable**
- **Lightweight**
- **Typescript** ready
- **ESM** and **CJS** available

## 🔎 Example

Demo coming soon.

```jsx
import Popup from 'react-customizable-popup';

const App = () => {
  return (
    <Popup
      toggler={
        <button>Open this popup</button>
      }
      position={[
        'center',
        'top',
      ]}
      /* Lots of other props */
    >
      <button data-close>Close this popup</button>
      {/* Your content */}
    </Popup>
  );
}
```

## 🚚 Installation

### Using Yarn

```bash
yarn add react-customizable-popup
```

### Using NPM

```bash
npm install react-customizable-popup
```

## 📚 Documentation

### Usage

To create a popup, import the package into your file and add a `Popup` component. This one has a mandatory prop, it's `toggler`. This prop corresponds to an element that will trigger the opening of the popup. The content of the popup are simply the children of the `Popup` component.

```jsx
import Popup from 'react-customizable-popup';

const App = () => {
  return (
    <Popup
      toggler={
        <button>Open this popup</button>
      }
    >
      {/* Your content */}
    </Popup>
  );
}
```

If you test this code, you will see that your toggler is present. The popup is located at the [`root`](#root) of your application. When you click on your toggler, the popup will appear on top of all the other elements, along with an optional [`backdrop`](#backdrop) that allows you to close the popup by clicking on it.

You can also add an element (like a cross for example) inside the popup to close it. To do this, add the attribute `data-close` to your element.

```jsx
<Popup
  //...
>
  <button data-close>Close this popup</button>
  {/* Your content */}
</Popup>
```

### Props

Here are listed all the props you can use to customize your popup as you wish.

#### `root`

> Required: **no**
>
> Type: **string**
>
> Default value: `#root`

The root of the application.

This prop is quite important depending on the framework you use. The root of the application often has an id equal to `root`, but not all the time. For example, if you are using [Nextjs](https://nextjs.org/), this prop should take the value `#next`.

#### `toggler`

> Required: **yes**
>
> Type: **ReactElement**
>
> Default value: none

The trigger for opening the popup.

See [Usage](#usage).

#### `toggleOn`

> Required: **no**
>
> Type: **'click' | 'hover'**
>
> Default value: `'click'`

The way to trigger the opening of the popup.

The popup will open either when the toggler is clicked or when the mouse hovers over the toggle. If `hover` is chosen, the [`backdrop`](#backdrop) prop will be set to false.

#### `position`

> Required: **no**
>
> Type: **[**
>
>   **'center' | 'left' | 'midleft' | 'right' | 'midright',**
>
>   **'center' | 'top' | 'midtop' | 'bottom' | 'midbottom',**
>
> **]**
>
> Default value: `['center', 'bottom']`

The position of the popup in relation to the toggler.

The first value in the array corresponds to the horizontal axis, and the second corresponds to the vertical axis. Values starting with `mid` place the popup on an edge of the toggler and make it go beyond the other edge. To understand it better, look at the [demo]().

#### `noScroll`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If the scroll is disabled while the popup is open.

⚠️ This prop is equal to `false` if the prop [`fixed`](#fixed) is set to `true`.

#### `fixed`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `false`

If the popup remains fixed at its opening position at scroll.

⚠️ If this prop is set to `true`, the prop [`noScroll`](#noscroll) will be set to `false`.

#### `arrow`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If there is an arrow.

The arrow is automatically positioned according to the position of the popup and the toggler. This arrow is easy to [style](#applying-styles).

#### `arrowSize`

> Required: **no**
>
> Type: **number**
>
> Default value: `12`

The size of the arrow in pixels.

#### `backdrop`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If there is a backdrop.

This backdrop appears when the popup is open and allows to close it with a click. It is possible to [style](#applying-styles) this backdrop.

#### `className`

> Required: **no**
>
> Type: **string**
>
> Default value: none

The class(es) to apply to the popup.

⚠️ By specifying this prop, the default popup styles will be omitted so you can [apply your own](#applying-styles).

#### `backdropClassName`

> Required: **no**
>
> Type: **string**
>
> Default value: none

The class(es) to apply to the popup backdrop.

⚠️ By specifying this prop, the default backdrop styles will be omitted so you can [apply your own](#applying-styles).

#### `distanceFromToggler`

> Required: **no**
>
> Type: **number**
>
> Default value: `12`

The distance from the popup to the toggler in pixels.

#### `onOpen`

> Required: **no**
>
> Type: **() => void**
>
> Default value: none

A function that runs at the opening of the popup.

#### `onClose`

> Required: **no**
>
> Type: **() => void**
>
> Default value: none

A function that runs at the closing of the popup.

### Styling

#### Applying styles

Styles are set by default and you can keep them if you want, but you can also delete them and set your own. To do this, add the [`className`](#classname) prop (and/or the [`backdropClassName`](#backdropclassname) prop) and simply customize your popup (and/or your backdrop) with css.

The [`arrow`](#arrow) will inherit the backdrop and border styles from your popup, so you don't have to worry about it. If you want to change its size, look at the [`arrowSize`](#arrowsize) prop.

#### Applying animations

The animations are simply css transitions because **the popup is never removed from the DOM**. The popup is actually hidden by setting `opacity` to `0`. To set animations (and different transitions at the opening and closing of the popup), you can use the `open` class over your own class.

```css
.my-popup-class {
  /* The closing animation */
  transform: translateY(1rem);
  transition: transform 0.1s ease-in, opacity 0.1s ease-in;
}

.my-popup-class.open {
  /* The opening animation */
  transform: translateY(0);
  transition: transform 0.3s ease-out, opacity 0.3s ease-in;
}
```

⚠️ If you are using [css modules](https://github.com/css-modules/css-modules), you must use the `:global` selector on the `open` class.

```css
.my-popup-class:global(.open) {
  /* ... */
}
```

The [`backdrop`](#backdrop) animations work in the same way.

## 📄 License

[MIT](LICENSE) © Colin Lienard