import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.card}>
        <p>Hi there, I'm{' '}
          <strong>Given</strong>
          {' '}a software engineer and An Ethical Penetester</p>
        <p>
          You can contact me on {' '}
          <a href="https://t.me/shungumutitima">Telegram</a> | {' '}
          <a href="https://twitter.com/m4g3n74">Twitter</a>
        </p>
      </section>
    </Layout>
  );
}
