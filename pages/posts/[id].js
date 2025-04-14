import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import TableOfContents from '../../components/TableOfContents'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
   // Add the "await" keyword like this:
   const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.excerpt || `${postData.title} - ${postData.date}`} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.excerpt || `${postData.title} - ${postData.date}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={postData.date} />
      </Head>
      <article className={utilStyles.articleContainer}>
        <div className={utilStyles.articleHeader}>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.articleMeta}>
            <div className={utilStyles.articleDate}>
              <Date dateString={postData.date} />
            </div>
            <div className={utilStyles.articleReadingTime}>
              {postData.readingTime} min read
            </div>
          </div>
        </div>

        <div className={utilStyles.articleContent}>
          {postData.headings && postData.headings.length > 0 && (
            <div className={utilStyles.tocWrapper}>
              <TableOfContents headings={postData.headings} />
            </div>
          )}

          <div
            className={utilStyles.articleBody}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </article>
    </Layout>
  )
}