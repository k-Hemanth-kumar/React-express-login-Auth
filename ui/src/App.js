import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <div className="App">
      <Login/>
      <SignUp/>
    </div>
  );
}

export default App;
