import { useState, useEffect } from "react";
// import CoinCard from "./components/CoinCard";
// import LimitSelector from "./components/LimitSelector";
// import FilterInput from "./components/FilterInput";
// import SortSelector from "./components/SortSelector";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import Header from "./components/Header.jsx";
import NotFoundPage from "./pages/not-found.jsx";
import CoinDetailsPage from "./pages/coin-details.jsx";

// const API_URL =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const API_URL = import.meta.env.VITE_COINS_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(coins);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  //   useEffect(() => {
  //     fetch(API_URL)
  //       .then((response) => {
  // console.log(response);

  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');}

  //         return response.json();
  //       })
  //       .then((data) => {
  //         setCoins(data);
  //         setLoading(false);

  //         }).catch((error) => {
  //           console.log(error.message);

  //           setError(error.message);
  //           setLoading(false);
  //         });
  //   },[]);

  useEffect(() => {
    const fetcCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetcCoins();
  }, [limit]);

  // const filteredCoins = coins.filter((coin) =>
  //     coin.name.toLowerCase().includes(filter.toLowerCase()) ||
  //     coin.symbol.toLowerCase().includes(filter.toLowerCase())
  //   ).sort((a, b) => {
  //     switch (sortBy) {
  //       case "market_cap_desc":
  //         return b.market_cap - a.market_cap;
  //       case "price_desc":
  //         return b.current_price - a.current_price;
  //       case "price_asc":
  //         return a.current_price - b.current_price;
  //       case "change_desc":
  //         return b.price_change_percentage_24h - a.price_change_percentage_24h;
  //       case "change_asc":
  //         return a.price_change_percentage_24h - b.price_change_percentage_24h;
  //       default:
  //         return 0;
  //     }})

  return (
    <>
      {/* <div>
        <h1> 🚀Crypto Dashboard</h1>

        <div className="top-controls">
          <FilterInput filter={filter} onFilterChange={setFilter} />
          <LimitSelector limit={limit} onLimitChange={setLimit} />
          <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {loading && <div>Loading...</div>}

        {error && <div>Error: {error.message}</div>}

        { !loading && !error && (
          <main className="grid">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))
            ) : (
              <div>No coins match the filter criteria.</div>
            )}
          </main>
        )}
      </div> */}
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              loading={loading}
              error={error}
              limit={limit}
              filter={filter}
              sortBy={sortBy}
              setLimit={setLimit}
              setFilter={setFilter}
              setSortBy={setSortBy}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
