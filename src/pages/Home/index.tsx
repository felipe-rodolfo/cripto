import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { FormEvent, useEffect, useState } from 'react';

interface CoinsProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

export function Home() {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('https://sujeitoprogramador.com/api-cripto/?key=d30639e2a6a1eb52');
      const data = await response.json();

      let coinsData = data.coins.slice(0, 15);

      const formatCoins = (coinsData: CoinsProps[]) => {
        let price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        return coinsData.map((item) => ({
          ...item,
          formatedPrice: price.format(Number(item.price)),
          formatedMarket: price.format(Number(item.market_cap)),
        }));
      };

      const formatResult = formatCoins(coinsData);
      setCoins(formatResult);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue === "") return;
    navigate(`detail/${inputValue}`);
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o símbolo da moeda"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {coins.map(({ name, symbol, formatedMarket, formatedPrice, delta_24h }) => (
            <tr key={name} className={styles.tr}>
              <td data-label="Moeda" className={styles.label}>
                <Link className={styles.link} to={`detail/${symbol}`}>
                  <span>{name}</span> | {symbol}
                </Link>
              </td>
              <td data-label="Mercado" className={styles.tdLabel}>
                {formatedMarket}
              </td>
              <td data-label="Preço" className={styles.tdLabel}>
                {formatedPrice}
              </td>
              <td
                className={parseInt(delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss}
                data-label="Volume"
              >
                <span>{delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
