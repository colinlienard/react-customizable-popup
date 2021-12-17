# 💬 react-customizable-popup

[![MIT License](https://img.shields.io/github/license/ColinLienard/react-customizable-popup)](LICENSE)

A simple and easy to use react library to create [fully customizable](#documentation) popups.

## 📋 Table of content

- ✨ [Features](#features)
- 🔎 [Example](#example)
- 📦️ [Installation](#installation)
- 📚 [Documentation](#documentation)
  - [Usage](#Usage)
  - [Props](#Props)
    - [root](#root)
    - [position](#position)
    - [disableScroll](#disableScroll)
    - [fixed](#fixed)
    - [arrow](#arrow)
    - [arrowSize](#arrowSize)
    - [className](#className)
    - [distanceFromToggler](#distanceFromToggler)
    - [distanceFromEdges](#distanceFromEdges)
  - [Styling](#Styling)
    - [Applying styles](#applying-styles)
    - [Applying animations](#applying-animations)
- 📄 [License](#license)

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

To create a popup, import it into your file and add a `Popup` component. This one has a mandatory property, it's `toggler`. This property corresponds to an element that will trigger the opening of the popup. The content of the popup are simply the `children` of the `Popup` component.

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

If you test this code, you will see that your toggler is present. The popup is located at the [`root`](#root) of your application. When you click on your toggler, the popup will appear on top of all the other elements, along with an [optional background]() that allows you to close the popup by clicking on it.

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

#### Root

> Type: **string**
> Default value: `#root`

This property is quite important depending on the framework you use. The root of the application often has an id equal to `root`, but not all the time. For example, if you are using [Nextjs](https://nextjs.org/), this property should take the value `#next`.

## 📄 License

[MIT](LICENSE) © Colin Lienard