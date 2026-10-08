import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";

const HomePage = (
  {coins,
  loading,
  error,
  limit,
  filter,
  sortBy,
  setLimit,
  setFilter,
  setSortBy}
) => {
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (

      <div>
        <h1> 🚀Crypto Dashboard</h1>

        <div className="top-controls">
          <FilterInput filter={filter} onFilterChange={setFilter} />
          <LimitSelector limit={limit} onLimitChange={setLimit} />
          <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {loading && <div>Loading...</div>}

        {error && <div>Error: {error.message}</div>}

        {!loading && !error && (
          <main className="grid">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) =>
                <CoinCard key={coin.id} coin={coin} />
              )
            ) : (
              <div>No coins match the filter criteria.</div>
            )}
          </main>
        )}
      </div>
  
  );
};

export default HomePage;
