import React, { useState, useEffect } from "react";
// Tabs
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
// Components
import Stock from "./Stock";
import Sale from "./Sale";
import History from "./History";

export default function Main() {
  const [tabsKey, setTabsKey] = useState("stock");
  let [stockCount, setStockCount] = useState(0);

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={tabsKey}
        onSelect={(k) => setTabsKey(k)}
        className="tabs d-flex justify-content-start"
      >
        <Tab eventKey="stock" title={`Stock (${stockCount})`}>
          <div>
            {tabsKey === "stock" ? (
              <Stock stock={(value) => setStockCount(value)} />
            ) : (
              ""
            )}
          </div>
        </Tab>
        <Tab eventKey="sale" title={`Sale ()`}>
          <div>{tabsKey === "sale" ? <Sale /> : ""}</div>
        </Tab>
        <Tab eventKey="saleHistory" title={`Sale History ()`}>
          <div>{tabsKey === "saleHistory" ? <History /> : ""}</div>
        </Tab>
      </Tabs>
    </>
  );
}
