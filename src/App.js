import './App.scss';
import MainLayout from './layouts/MainLayout/MainLayout';
import Weather from './pages/Weather/Weather';
import { useSelector } from 'react-redux'

function App() {


  return (
    <MainLayout>

      <Weather />
    </MainLayout>
  );
}

export default App;
