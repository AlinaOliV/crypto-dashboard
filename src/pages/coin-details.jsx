import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import CoinChart from "../components/CoinChart.jsx";

const API_COIN_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(coin);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`${API_COIN_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch coin data");
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  return (
    // <>
    //   {id}
    // </>
    <div className="coin-details-container">
      <Link to="/">← Back to Home</Link>
      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>

      {/* {loading && <p>Loading...</p>} */}
      {loading && <Spinner color="red" />}

      {error && <p className="error">Error: {error}</p>}

      <CoinChart coinid={id} />

      {!loading && !error && coin && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en}</p>
          <div className="coin-details-info">
            <p>Rank: #{coin.market_cap_rank}</p>
            <p>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </p>
            <p>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </p>
            <p>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</p>
            <p>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</p>
            <p>
              Price Change (24h):{" "}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p>
              Price Change (7d):{" "}
              {coin.market_data.price_change_percentage_7d.toFixed(2)}%
            </p>
            <p>
              Price Change (14d):{" "}
              {coin.market_data.price_change_percentage_14d.toFixed(2)}%
            </p>
            <p>
              Price Change (30d):{" "}
              {coin.market_data.price_change_percentage_30d.toFixed(2)}%
            </p>
          </div>
          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                Homepage:{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {coin.links.homepage[0]}
                </a>
              </p>
            )}
          </div>
        </>
      )}

      {!loading && !error && !coin && <p>Coin not found.</p>}
    </div>
  );
};

export default CoinDetailsPage;
