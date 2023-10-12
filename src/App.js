import logo from './logo.svg';
import './App.css';
import Crypto from './components/Crypto';

function App() {
  return (
    <div className="container-fluid">
      <h1 className='text-center mt-3'>React Crypto</h1>
        <Crypto />
    </div>
  );
}

export default App;
