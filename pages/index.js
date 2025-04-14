import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date'

export async function getStaticProps() {
  // Get posts for the front page (limit to 3)
  const allPostsData = getSortedPostsData(3)

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
        <p>Hi Mate,{' '}
          <strong>Given </strong>here
          {' '}a <strong>junior Software engineer </strong> at <a href="https://probasegroup.com/">Probase Group</a></p>
          <p>This place is where i dump my research and some useful writings </p>
        <p>
          You can contact me on {' '}
          <a href="https://t.me/m4g3n74">Telegram</a> | {' '}
          <a href="https://twitter.com/m4g3n74"> X </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Latest Posts</h2>
        <div className={utilStyles.cardGrid}>
          {allPostsData.map(({ id, date, title, excerpt, readingTime }) => (
            <div className={utilStyles.card} key={id}>
              <div className={utilStyles.cardDateBadge}>
                <Date dateString={date} />
              </div>
              <h3 className={utilStyles.cardTitle}>
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a className="hover:no-underline">{title}</a>
                </Link>
              </h3>
              <div className={utilStyles.cardMeta}>
                <span className={utilStyles.readingTime}>{readingTime} min read</span>
              </div>
              <p className={`${utilStyles.cardExcerpt} mt-2`}>{excerpt}</p>
              <div className="mt-4">
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a className={utilStyles.readMoreLink}>Read more →</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" legacyBehavior>
            <a className={utilStyles.viewAllLink}>View all posts</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

// As an easter egg i have added all my avatars that i mostly use on all socials! //