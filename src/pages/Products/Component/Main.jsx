import React, { useState, useEffect } from "react";
// Tabs
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Main() {
  const [tabsKey, setTabsKey] = useState("stock");

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={tabsKey}
        onSelect={(k) => setTabsKey(k)}
        className="tabs d-flex justify-content-start"
      >
        <Tab eventKey="stock" title={`Stock ()`}>
          <div>{tabsKey === "stock" ? "" : ""}</div>
        </Tab>
        <Tab eventKey="sale" title={`Sale ()`}>
          <div>{tabsKey === "sale" ? "" : ""}</div>
        </Tab>
        <Tab eventKey="saleHistory" title={`Sale History ()`}>
          <div>{tabsKey === "saleHistory" ? "" : ""}</div>
        </Tab>
      </Tabs>
    </>
  );
}
