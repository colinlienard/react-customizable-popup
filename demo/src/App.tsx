/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-absolute-path */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import Popup from 'react-customizable-popup';
import cross from '/icons/cross.svg';
import './App.scss';

const App = () => {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('yarn add react-customizable-popup');
    setCopied(true);
  };

  return (
    <>
      <header>
        <h1>
          react-customizable-popup
          <span> demo</span>
        </h1>
        <p>A simple and easy to use react library to create fully customizable popups.</p>
        <div className="wrapper">
          <a href="https://github.com/ColinLienard/react-customizable-popup" target="_blank" rel="noreferrer">GitHub repo</a>
          <a href="https://github.com/ColinLienard" target="_blank" rel="noreferrer">Author</a>
        </div>
        <Popup
          toggler={
            <button type="button" onClick={copyInstall}>yarn add react-customizable-popup</button>
          }
          toggleOn="hover"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Popup>
      </header>
      <main>
        <section>
          <h2>Default behaviour</h2>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
          >
            <button className="cross" type="button" data-close>
              <img src={cross} alt="" />
            </button>
            <p>It seems to work.</p>
          </Popup>
        </section>
        <section>
          <h2>Open on hover</h2>
          <Popup
            toggler={
              <button className="button" type="button">Hover me</button>
            }
            toggleOn="hover"
          >
            <p>It seems to work.</p>
          </Popup>
        </section>
        <section>
          <h2>Different positions</h2>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            position={['right', 'center']}
          >
            <p>The value is <span className="link">[&apos;right&apos;, &apos;center&apos;]</span>.</p>
          </Popup>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            position={['center', 'top']}
          >
            <p>The value is <span className="link">[&apos;center&apos;, &apos;top&apos;]</span>.</p>
          </Popup>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            position={['midleft', 'bottom']}
          >
            <p>The value is <span className="link">[&apos;midleft&apos;, &apos;bottom&apos;]</span>.</p>
          </Popup>
        </section>
        <section>
          <h2>Scroll allowed</h2>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            noScroll={false}
          >
            <p>You can scroll even if the popup is open.</p>
          </Popup>
        </section>
        <section>
          <h2>Fixed on scroll</h2>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            fixed
          >
            <p>This popup is fixed.</p>
          </Popup>
        </section>
        <section>
          <h2>No backdrop</h2>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            backdrop={false}
          >
            <button className="cross" type="button" data-close>
              <img src={cross} alt="" />
            </button>
            <p>This popup has no backdrop.</p>
          </Popup>
        </section>
        <section>
          <h2>Styled popup</h2>
          <Popup
            toggler={
              <button className="button" type="button">Click me</button>
            }
            className="custom-popup"
            backdropClassName="custom-backdrop-popup"
            arrowSize={20}
            position={['center', 'top']}
            distanceFromToggler={40}
          >
            <button className="cross" type="button" data-close>
              <img src={cross} alt="" />
            </button>
            <p>This popup is styled !</p>
          </Popup>
        </section>
        <section>
          <h2>And many other options...</h2>
          <a className="link" href="https://github.com/ColinLienard/react-customizable-popup#readme" target="_blank" rel="noreferrer">Documentation</a>
        </section>
      </main>
    </>
  );
};

export default App;
