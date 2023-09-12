
import { Abate } from './components/abate'
import { Desossa } from './components/desossa'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Abate/>
      <div className="div-com-traco"></div>
      <Desossa/>
    </main>
  )
}
