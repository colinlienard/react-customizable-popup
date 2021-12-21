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
      </main>
    </>
  );
};

export default App;
