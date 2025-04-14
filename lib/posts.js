import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

// Calculate reading time based on content length
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime < 1 ? 1 : readingTime;
}

export function getSortedPostsData(limit) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Calculate reading time
    const readingTime = calculateReadingTime(matterResult.content);

    // Extract a short excerpt from the content
    const excerpt = matterResult.content
      .trim()
      .split('\n')
      .slice(0, 2)
      .join(' ')
      .substring(0, 150) + '...'

    // Combine the data with the id, excerpt, and reading time
    return {
      id,
      excerpt,
      readingTime,
      ...matterResult.data
    }
  })
  // Sort posts by date
  const sortedPosts = allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })

  // Return all posts or limit if specified
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Calculate reading time
  const readingTime = calculateReadingTime(matterResult.content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Generate table of contents from headings
  const headings = [];
  const headingRegex = /<h([2-3])>(.*?)<\/h[2-3]>/g;
  let match;

  while ((match = headingRegex.exec(contentHtml)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2];
    const slug = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');

    // Add id attribute to the heading in the HTML
    const headingWithId = `<h${level} id="${slug}">${text}</h${level}>`;
    contentHtml = contentHtml.replace(match[0], headingWithId);

    headings.push({ level, text, slug });
  }

  // Combine the data with the id, contentHtml, reading time, and headings
  return {
    id,
    contentHtml,
    readingTime,
    headings,
    ...matterResult.data
  }
}