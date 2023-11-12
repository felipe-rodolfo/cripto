import { useNavigate, useParams } from 'react-router-dom';
import styles from './detail.module.css';
import { useEffect, useState } from 'react';

interface CoinProp {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  delta_24h: string | number;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  error?: string;
}

export function Detail() {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProp>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=d30639e2a6a1eb52&pref=BRL&symbol=${cripto}`);
      const data = await response.json();

      const formatPrice = (value: number) => {
        const priceFormatter = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return priceFormatter.format(value);
      };

      const resultData = {
        ...data,
        formatedPrice: formatPrice(Number(data.price)),
        formatedMarket: formatPrice(Number(data.market_cap)),
        formatedLowPrice: formatPrice(Number(data.low_24h)),
        formatedHighPrice: formatPrice(Number(data.high_24h)),
      };

      setDetail(resultData);
      setLoading(false);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, [cripto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações...</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>

      <section className={styles.content}>
        <p><strong>Preço:</strong> {detail?.formatedPrice}</p>
        <p><strong>Maior preço 24h:</strong> {detail?.formatedHighPrice}</p>
        <p><strong>Menor preço 24h:</strong> {detail?.formatedLowPrice}</p>
        <p>
          <strong>Delta 24h:</strong>{" "}
          <span className={parseInt(detail?.delta_24h) >= 0 ? styles.profit : styles.loss}>
            {detail?.delta_24h}
          </span>
        </p>
        <p><strong>Valor mercado:</strong> {detail?.formatedMarket}</p>
      </section>
    </div>
  );
}
