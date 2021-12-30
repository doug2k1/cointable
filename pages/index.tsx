import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage<{ coins: { symbol: string; price: number }[] }> = ({
  coins,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coin Table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.symbol}>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {
      coins: [
        {
          symbol: 'BTC',
          price: 49999,
        },
      ],
    }, // will be passed to the page component as props
  }
}
