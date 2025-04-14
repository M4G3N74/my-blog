import React from 'react';
import styles from './tableOfContents.module.css';

export default function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className={styles.tocContainer}>
      <h2 className={styles.tocTitle}>Table of Contents</h2>
      <nav className={styles.toc}>
        <ul className={styles.tocList}>
          {headings.map((heading) => (
            <li 
              key={heading.slug} 
              className={`${styles.tocItem} ${heading.level === 3 ? styles.tocLevel2 : ''}`}
            >
              <a 
                href={`#${heading.slug}`} 
                className={styles.tocLink}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
