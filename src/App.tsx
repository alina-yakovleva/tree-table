import Table from "./components/Table";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {

  return (
    <div className="App">
      <Header />

      <div className="content">
        <Sidebar />
        <Table />
      </div>
    </div>
  );
}

export default App;
