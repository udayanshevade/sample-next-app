import React from 'react';
import classnames from 'classnames';
import styles from '../../styles/Comment.module.css';

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const Comment = ({
  id,
  className,
  name,
  email,
  body,
}: {
  id: number;
  className?: string;
  name: string;
  email: string;
  body: string;
}) => {
  return (
    <div
      role="comment"
      id={`comment-${id}`}
      className={classnames(styles.comment, className)}
    >
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <small className={styles.email}>
          <a className={styles.emailLink} href={`mailto:${email}`}>
            {email}
          </a>
        </small>
      </div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};
