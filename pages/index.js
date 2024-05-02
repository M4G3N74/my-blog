import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={''}>
        <p>Hello Traveler, I'm{' '}
          <strong>Given</strong>
          {' '}A <strong>Jr Backend</strong> Software engineer & Some <strong>Red Teaming</strong> 😉</p>
          <p>This place is where i dump my research and some useful writings </p>
        <p>
          You can contact me on {' '}
          <a href="https://t.me/m4g3n74">Telegram</a> | {' '}
          <a href="https://twitter.com/m4g3n74"> X </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`} legacyBehavior>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// As an easter egg i have added all my avatars that i mostly use on all socials! //