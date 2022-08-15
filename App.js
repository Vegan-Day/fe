import { NavigationContainer } from '@react-navigation/native';
import Menu from './components/menu/menu';
import Header from './components/header/header';

function App() {
  return (
    <NavigationContainer>
      <Header />
      <Menu />
    </NavigationContainer>
  );
}

export default App;
