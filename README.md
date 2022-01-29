<div align="center">

# 💬 [react-customizable-popup](https://react-customizable-popup.vercel.app/)

[![NPM version](https://img.shields.io/npm/v/react-customizable-popup)](https://www.npmjs.com/package/react-customizable-popup) ![NPM size](https://img.shields.io/bundlephobia/minzip/react-customizable-popup?color=ff69b4) [![MIT License](https://img.shields.io/github/license/ColinLienard/react-customizable-popup?color=brightgreen)](LICENSE)

A simple and easy to use react library to create [fully customizable](#-documentation) popups.

</div>

---

## 📋 Table of content

- ✨ [Features](#-features)
- 🔎 [Example](#-example)
- 🚚 [Installation](#-installation)
- 📚 [Documentation](#-documentation)
  - [Basic usage](#basic-usage)
  - [Usage without a toggler](#usage-without-a-toggler)
  - [Globally set the root](#globally-set-the-root)
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
    - [`distanceFromEdges`](#distancefromedges)
    - [`portal`](#portal)
    - [`onOpen`](#onopen)
    - [`onClose`](#onclose)
  - [Styling](#styling)
    - [Applying styles](#applying-styles)
    - [Applying animations](#applying-animations)
- 🔮 [Features that may be implemented in the future](#-features-that-may-be-implemented-in-the-future)
- 📄 [License](#-license)

## ✨ Features

- **Easy** to use
- Fully **customizable**
- **Typescript** ready
- **SSR** support
- **Lightweight**
- **ESM** and **CJS** available

## 🔎 Example

See the [demo](https://react-customizable-popup.vercel.app/).

```jsx
import Popup from 'react-customizable-popup';

const App = () => {
  return (
    <Popup
      toggler={<button>Open this popup</button>}
      position={['center', 'top']}
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

### Basic usage

To create a popup, import the package into your file and add a `Popup` component. This one has an important prop, it's `toggler`. This prop corresponds to an element that will trigger the opening of the popup. The content of the popup is simply the children of the `Popup` component.

```jsx
import Popup from 'react-customizable-popup';

const App = () => {
  return (
    <Popup toggler={<button>Open this popup</button>}>
      {/* Your content */}
    </Popup>
  );
};
```

If you test this code, you will see that your toggler is present. The popup is located at the root of your application. When you click on your toggler, the popup will appear on top of all the other elements, along with an optional [`backdrop`](#backdrop) that allows you to close the popup by clicking on it.

You can also add an element (like a cross for example) inside the popup to close it. To do this, add the attribute `data-close` to your element.

```jsx
<Popup some-props>
  <button data-close>Close this popup</button>
  {/* Your content */}
</Popup>
```

### Usage without a toggler

If you don't want any toggler for your popup (because you want to open it after a condition for example), you can omit the `toggler` prop and instead use a ref on the popup to access its methods. These methods are `open`, `close` and `toggle`.

```jsx
import Popup from 'react-customizable-popup';

const App = () => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      setTimeout(() => popupRef.current.open(), 2000); // Open the popup after 2 seconds
    }
  }, []);

  return (
    <Popup ref={popupRef}>
      {/* Your content */}
    </Popup>
  );
};
```

If you use Typescript, you can do the following :

```tsx
import Popup, { PopupHandle } from 'react-customizable-popup';

const App = () => {
  const popupRef = useRef<PopupHandle>(null);
  // And then the same thing
};
```

### Globally set the root

⚠️ This is only necessary if the root of your application has an id different from `root`.

As mentioned earlier, the popup is located at the root of your application. The root of the application often has an id of `root` (it is the case with [Create React App](https://create-react-app.dev/) and [Vite](https://vitejs.dev/) with React), but not all the time. For example, if you are using [Nextjs](https://nextjs.org/), the root id is `__next`.

To specify the root, you can set the [`root`](#root) prop on each popup, but this is not ideal if you use many popups in your application. You can therefore set the root globally by using a context. In your `app.jsx` or `main.jsx`, add the `PopupProvider` around your app and set the root.

```jsx
import { PopupProvider } from 'react-customizable-popup';

ReactDOM.render(
  <PopupProvider root="#your-root-id">
    <App />
  </PopupProvider>,
  document.getElementById('#your-root-id'), // It should be the same
);
```

If you are using [Nextjs](https://nextjs.org/), you can do the following in your `_app.jsx` file.

```jsx
import { PopupProvider } from 'react-customizable-popup';

const App = ({ Component, pageProps }) => (
  <PopupProvider root="#__next">
    <Component {...pageProps} />
  </PopupProvider>
);
```

### Props

Here are listed all the props you can use to customize your popup as you wish.

#### `root`

> Required: **no**
>
> Type: **string**
>
> Default value: `#root`

The root of the application, and where the popup will be rendered.

See [Globally set the root](#globally-set-the-root).

#### `toggler`

> Required: **no**
>
> Type: **ReactElement**
>
> Default value: none

The trigger for opening the popup.

See [Usage](#usage).

⚠️ If your toggler is a React component, you must use [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) on your component.

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
> **] | 'modal'**
>
> Default value: `['center', 'bottom']`

The position of the popup in relation to the toggler.

The first value in the array corresponds to the horizontal axis, and the second corresponds to the vertical axis. Values starting with `mid` place the popup on an edge of the toggler and make it go beyond the other edge. To understand it better, look at the [demo]().

If this value is set to `modal`, the popup is positionned at the center of the screen, regardless of the position of the toggler, and the [`fixed`](#fixed) prop is set to `true`.

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

⚠️ If your toggler is located in a fixed area, for example a navigation bar, make sure to set this prop to `true`.

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

#### `distanceFromEdges`

> Required: **no**
>
> Type: **number**
>
> Default value: `0`

The distance from the popup to the edges of the screen.

If the popup is too large and overflows from one side of the screen, its position will be adjusted so that the popup does not overflow. This property corresponds to the minimum distance the popup will have from the edges of the screen so that it will not stick to it.

#### `portal`

> Required: **no**
>
> Type: **boolean**
>
> Default value: `true`

If the popup component is rendered with a [react portal](https://fr.reactjs.org/docs/portals.html) at the [`root`](#root) of the application.

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

The [`arrow`](#arrow) will inherit the background and border styles from your popup, so you don't have to worry about it. If you want to change its size, look at the [`arrowSize`](#arrowsize) prop.

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

## 🔮 Features that may be implemented in the future

- Support for **CSS-in-JS**

## 📄 License

[MIT](LICENSE) © Colin Lienard