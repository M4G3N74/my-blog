import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

export async function getStaticProps() {
  // Get all posts for the blog page
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}

export default function Blog({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Blog - {siteTitle}</title>
      </Head>
      <section>
        <h1 className={utilStyles.headingXl}>All Blog Posts</h1>
        <div className={utilStyles.cardGrid}>
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <div className={utilStyles.card} key={id}>
              <div className={utilStyles.cardDateBadge}>
                <Date dateString={date} />
              </div>
              <h3 className={utilStyles.cardTitle}>
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a className="hover:no-underline">{title}</a>
                </Link>
              </h3>
              <p className={`${utilStyles.cardExcerpt} mt-2`}>{excerpt}</p>
              <div className="mt-4">
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a className={utilStyles.readMoreLink}>Read more →</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/" legacyBehavior>
            <a className={utilStyles.backLink}>← Back to home</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
