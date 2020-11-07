import React from 'react';
import classnames from 'classnames';
import styles from '../../styles/Post.module.css';

export const Post = ({
  id,
  className,
  title,
  body,
}: {
  id: number;
  userId: number;
  className: string | undefined;
  title: string;
  body: string;
}) => (
  <article id={`post-${id}`} className={classnames(styles.post, className)}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.body}>{body}</div>
  </article>
);
