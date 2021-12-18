<div align="center">

# 💬 react-customizable-popup

[![MIT License](https://img.shields.io/github/license/ColinLienard/react-customizable-popup?color=brightgreen)](LICENSE)

A simple and easy to use react library to create [fully customizable](#📚-documentation) popups.

</div>

---

## 📋 Table of content

- [✨ Features](#✨-features)
- [🔎 Example](#🔎-example)
- [📦️ Installation](#📦️-installation)
- [📚 Documentation](#📚-documentation)
  - [Usage](#Usage)
  - [Props](#Props)
    - [`root`](#root)
    - [`toggler`](#toggler)
    - [`toggleOn`](#toggleon)
    - [`position`](#position)
    - [`disableScroll`](#disablescroll)
    - [`fixed`](#fixed)
    - [`arrow`](#arrow)
    - [`arrowSize`](#arrowsize)
    - [`background`](#background)
    - [`className`](#classname)
    - [`distanceFromToggler`](#distancefromtoggler)
    - [`distanceFromEdges`](#distancefromedges)
  - [Styling](#styling)
    - [Applying styles](#applying-styles)
    - [Applying animations](#applying-animations)
- [📄 License](#📄-license)

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

## 📦️ Installation

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

If you test this code, you will see that your toggler is present. The popup is located at the [`root`](#root) of your application. When you click on your toggler, the popup will appear on top of all the other elements, along with an optional [`background`](#background) that allows you to close the popup by clicking on it.

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

### `toggler`

> Required: **yes**
>
> Type: **ReactElement**
>
> Default value: none

The trigger for opening the popup.
See [Usage](#usage).

### `toggleOn`

> Required: **no**
>
> Type: **'click' | 'hover'**
>
> Default value: `'click'`

The way to trigger the opening of the popup.
The popup will open either when the toggler is clicked or when the mouse hovers over the toggle. If `hover` is chosen, the [`background`](#background) prop will be set to false.

### `position`

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

### `disableScroll`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If the scroll is disabled while the popup is open.
⚠️ This prop is equal to `false` if the prop [`fixed`](#fixed) is set to `true`.

### `fixed`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `false`

If the popup remains fixed at its opening position at scroll.
⚠️ If this property is set to `true`, the prop [`disableScroll`](#disablescroll) will be set to `false`.

### `arrow`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If there is an arrow.
The arrow is automatically positioned according to the position of the popup and the toggler. This arrow is easy to [style](#applying-styles).

### `arrowSize`

> Required: **no**
>
> Type: **number**
>
> Default value: `12`

The size of the arrow in pixels.

### `background`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If there is a background.
This background appears when the popup is open and allows to close it with a click. It is possible to [style](#applying-styles) this background.

### `className`

> Required: **no**
>
> Type: **string**
>
> Default value: none

The class(es) to apply to the popup.
⚠️ By specifying this property, the default popup and background styles will be omitted so you can apply your own.

### `distanceFromToggler`

> Required: **no**
>
> Type: **number**
>
> Default value: `12`

The distance from the popup to the toggler in pixels.

### `distanceFromEdges`

> Required: **no**
>
> Type: **number**
>
> Default value: `0`

The distance from the popup to the edges of the screen.
If the popup is too large and overflows from one side of the screen, its position will be adjusted so that the popup does not overflow. This property corresponds to the minimum distance the popup will have from the edges of the screen so that it will not stick to it.

## 📄 License

[MIT](LICENSE) © Colin Lienard