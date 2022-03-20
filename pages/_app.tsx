import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { Layout } from '../components';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blog App</title>
        <link rel='icon' href='/blog-icon.png' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  )
}

export default MyApp;
