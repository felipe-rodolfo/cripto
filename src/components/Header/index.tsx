import { Link } from "react-router-dom";
import styles from './header.module.css';
import logo from '../../assets/cripto.png';


export function Header(){
  return (
    <div className={styles.container}>
    <div className={styles.logo}>
      <Link to="/">
        <img src={logo} alt="Cripta ícones criados por Vectors Tank - Flaticon" />
      </Link>
    </div>
  </div>
  )
}