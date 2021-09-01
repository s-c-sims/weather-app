import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css';

function App() {

  const handleClick =() =>
  {
    alert('Clicked');
  }
  return (
    <div className="App">
      <div className='container p-5 text-center align-items-center justify-content-center'>
      <h1>Hello World</h1>
      <button type="button" class="btn btn-primary" onClick={handleClick}>Primary</button>
      </div>
      
    </div>
  );
}

export default App;
