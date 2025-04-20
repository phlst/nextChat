import ReduxProvider from '../_components/ReduxProvider';
import MessengerContainer from '../_components/messenger/MessengerContainer';

function Container() {
  return (
    <ReduxProvider>
      <MessengerContainer />
    </ReduxProvider>
  );
}

export default Container;
