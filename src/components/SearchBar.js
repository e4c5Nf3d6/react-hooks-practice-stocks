import React, {useState} from "react";

function SearchBar({ onSetSortedBy, onFilterStocks }) {
  const [priceChecked, setpriceChecked] = useState('')
  const [nameChecked, setnameChecked] = useState('')

  function handleChange(e) {
    const clickedCheckedStatus = e.target.value === 'Alphabetically' ? nameChecked : priceChecked
    const setClicked = e.target.value === 'Alphabetically' ? setnameChecked : setpriceChecked
    const setNotClicked = e.target.value === 'Alphabetically' ? setpriceChecked : setnameChecked

    if (clickedCheckedStatus === '') {
      setClicked('checked')
      onSetSortedBy(e.target.value)
    } else {
      setClicked('')
      onSetSortedBy(null)
    }
    setNotClicked('')
  }

  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          checked={nameChecked}
          onChange={handleChange}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          checked={priceChecked}
          onChange={handleChange}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select onChange={e => onFilterStocks(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
