import axios from 'axios'
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

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.APIKEY!,
  },
})

export async function getStaticProps() {
  const response = await api.get('/quotes/latest', {
    params: { symbol: process.env.COINS },
  })

  const coinData: { symbol: string; quote: { USD: { price: number } } }[] =
    Object.values(response.data.data)

  return {
    props: {
      coins: coinData.map((coin) => ({
        symbol: coin.symbol,
        price: coin.quote.USD.price,
      })),
    },
  }
}
