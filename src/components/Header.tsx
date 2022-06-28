const logoImg = new URL("../assets/logo.png", import.meta.url).href;

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImg} alt="Um foguete a esquerda e logo escrito a direita" />
    </header>
  );
}
