import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortedBy, setSortedBy] = useState(null)
  const [filteredBy, setFilteredBy] = useState('All')

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then(r => r.json())
    .then(data => setStocks(data))
  }, [])

  function addToPortfolio(stockToAdd) {
    if (!portfolio.includes(stockToAdd)) {
      setPortfolio([...portfolio, stockToAdd])
    }
  }

  function removeFromPortfolio(stockToRemove) {
    const updatedPortfolio = portfolio.filter(stock => {
      return stock.id !== stockToRemove.id
    })
    setPortfolio(updatedPortfolio)
  }

  function filterStocks(category) {
    setFilteredBy(category)
  }

  const stocksToDisplay = [...stocks].filter(stock => {
    if (filteredBy === 'All') {
      return true
    } else {
      return stock.type === filteredBy
    }
  })

  if (sortedBy === "Alphabetically") {
    stocksToDisplay.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  } else if (sortedBy === "Price") {
      stocksToDisplay.sort(function (a, b) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    }

  return (
    <div>
      <SearchBar onSetSortedBy={setSortedBy} onFilterStocks={filterStocks} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocksToDisplay} onClickStock={addToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onClickStock={removeFromPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
