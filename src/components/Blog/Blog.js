import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styles from "./Blog.module.scss";

const Blog = ({ language }) => {
  const data = useStaticQuery(query);
  const filteredData = [];
  data.allGhostPost.edges.map(edge => {
    edge.node.tags.map(tag => {
      if (tag.slug === language) {
        filteredData.push(edge);
      }
    });
  });
  return (
    <div className={styles.blog}>
      <div className={styles.heading}>Overbit Blog</div>
      <div className={styles.wrapper}>
        {filteredData.map((info, index) => {
          if (index > 5) return;
          const blog = info.node;
          if (index == 0) {
            return (
              <a key={index} href={blog.url} className={styles.featured}>
                <div
                  style={{ backgroundImage: `url(${blog.feature_image})` }}
                  className={styles.featured_image}
                ></div>
                <div className={styles.featured_info}>
                  <p className={styles.title}>{blog.title}</p>
                  <p className={styles.excerpt}>{blog.excerpt}</p>
                  <div className={styles.author_info}>
                    {blog.authors[0].profile_image ? (
                      <img
                        className={styles.profile_image}
                        src={blog.authors[0].profile_image}
                      />
                    ) : (
                      <div className={styles.profile_image}></div>
                    )}
                    <div className={styles.author}>{blog.authors[0].name}</div>
                  </div>
                </div>
              </a>
            );
          } else {
            return (
              <a key={index} href={blog.url} className={styles.post}>
                <div
                  style={{ backgroundImage: `url(${blog.feature_image})` }}
                  className={styles.post_image}
                ></div>
                <p className={styles.title}>{blog.title}</p>
                <p className={styles.author_name}>{blog.authors[0].name}</p>
              </a>
            );
          }
        })}
      </div>
      <div className={styles.button}>
        <a href="https://blog.overbit.com">Show more</a>
      </div>
    </div>
  );
};

export default Blog;

const query = graphql`
  query GhostPosts {
    allGhostPost {
      edges {
        node {
          authors {
            url
            profile_image
            name
          }
          excerpt
          feature_image
          id
          title
          url
          tags {
            slug
          }
        }
      }
    }
  }
`;
