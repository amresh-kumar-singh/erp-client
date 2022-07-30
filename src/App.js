import "./App.css";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ContextProvider from "./Context";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Sidebar />
        <Navbar />
        <Main />
      </ContextProvider>
    </div>
  );
}

export default App;
