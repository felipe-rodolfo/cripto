import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { FormEvent, useEffect, useState } from 'react';

interface CoinsProps {
  name: string,
  delta_24h: string,
  price: string,
  symbol: string,
  volume_24h: string
  market_cap: string,
  formatedPrice: string,
  formatedMarket: string
}

interface DataProps {
  coins: CoinsProps[];
}

export function Home(){
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData(){
      fetch('https://sujeitoprogramador.com/api-cripto/?key=d30639e2a6a1eb52')
      .then((response) => response.json())
      .then((data: DataProps) => {
        let coinsData = data.coins.slice(0, 15);

        let price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        })

        const formatResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_cap)),
          }
          return formated;
        })
  
        setCoins(formatResult);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    getData()
  }, [])

  function handleSearch(e: FormEvent){
    e.preventDefault();
    if(inputValue === "") return;
    console.log("=================" + inputValue);
    navigate(`/detail/${inputValue}`)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input type="text" placeholder="Digite o símbolo da moeda" value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}/>
        <button type='submit'>
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {coins.map(coin => (
            <tr key={coin.name} className={styles.tr}>
              <td data-label="Moeda" className={styles.label}>
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>    
              <td data-label="Mercado" className={styles.tdLabel}>
                {coin.formatedMarket}
              </td>
              <td data-label="Preço" className={styles.tdLabel}>
                {coin.formatedPrice}
              </td>
              <td className={parseInt(coin.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                <span>
                  
                  {coin.delta_24h}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}