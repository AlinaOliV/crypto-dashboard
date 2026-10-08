const Filterinput = ({ filter, onFilterChange }) => {

    return(
        <div className="filter">
          <label htmlFor="filter">Filter Coins:</label>
          <input
            type="text"
            // id="filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Filtered by name symbol..."
          />
        </div>
      );
    };            
    export default Filterinput;