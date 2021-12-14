```jsx
import Popup from 'react-easy-popup';

Popup.app('#root');

const App = () => {
  return (
    <Popup
      toggler={(
        <ButtonComponent>
          My custom button component
        </ButtonComponent>
      )}
      toggleMode="click"
      position={{
        x: 'left',
        y: 'center',
      }}
      sticky
      arrow
      blockScroll
      className="..."
    >
      <button onClick={Popup.close}>Close Popup</button>
      <p>My content</p>
    </Popup>
  );
};
```