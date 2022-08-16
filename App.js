import { NavigationContainer } from '@react-navigation/native';
import Menu from './components/menu/menu';
import Header from './components/header/header';
import WholeStack from './stack';

function App() {
  return (
    <NavigationContainer>
      <Header />
      <WholeStack />
    </NavigationContainer>
  );
}

export default App;
