import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";

import "./styles.css";

import SearchForm from "./searchForm";

function App() {
  return <SearchForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
