import { NavigationContainer } from '@react-navigation/native';
import Header from './components/header/header';
import WholeStack from './stack';
import ViewShot from 'react-native-view-shot';

function App() {
  return (
    <NavigationContainer>
      <Header />
      <WholeStack />
    </NavigationContainer>
  );
}

export default App;
