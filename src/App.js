import './App.css';

// Components
import { Header } from './components/header'
// Pages
import { ModelTreeBrowser } from './pages/model-tree-browser'

export const App = () => {
  return (
    <div className="app">
      <Header />
      <ModelTreeBrowser />
    </div>
  );
}

export default App;
