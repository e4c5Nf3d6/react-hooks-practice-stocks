import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onClickStock }) {
  const portfolioList = portfolio.map(stock => {
    return (
      <Stock 
        key={stock.id}
        stock={stock}
        onClickStock={onClickStock}
      />
    )
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolioList
      }
    </div>
  );
}

export default PortfolioContainer;
