const SortSelector = ({ sortBy, onSortChange }) => {
    return(
        <div className="controls">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}>
            <option value="market_cap_desc">Market Cap (min to max)</option>
            <option value="price_desc">Price (max to min)</option>
            <option value="price_asc">Price (min to max)</option>
            <option value="change_desc">Change (max to min)</option>
            <option value="change_asc">Change (min to max)</option> </select>
        </div> 
                
    )
}
 
export default SortSelector;``