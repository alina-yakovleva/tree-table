import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getRows } from "./api";

import { IRow } from "./types";
import Table from "./components/Table";
function App() {
  const [rows, setRows] = useState<IRow[]>([]);

  useEffect(() => {
    getRows().then((data) => setRows(data));
  }, []);
  console.log("cells", rows);
  return (
    <div className="App">
      <Header />

      <div className="content">
        <Sidebar />
        <Table rows={rows} />
      </div>
    </div>
  );
}

export default App;
