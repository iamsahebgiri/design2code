import Head from 'next/head';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          design2code - Let's reduce the gap between designer and developer
        </title>
        <link rel='shortcut icon' type='image/svg+xml' href='./favicon.svg' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content='design2code' key='title' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
