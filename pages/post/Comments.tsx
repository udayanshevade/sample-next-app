import React from 'react';
import useSwr from 'swr';
import { Comment, IComment } from '../../components/Comment';
import { root } from '../../apiConfig';
import styles from '../../styles/Comments.module.css';

const fetcher = async (url: string): Promise<IComment[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch comments data');
  }
  const data: IComment[] = await res.json();
  return data;
};

export const Comments = ({ postId }: { postId: number }) => {
  const { data, error } = useSwr(`${root}/comments?postId=${postId}`, fetcher);

  if (error) {
    return <span>{error}</span>;
  }

  if (!data) {
    return <span>Loading comments...</span>;
  }

  return (
    <ul className={styles.container}>
      {data.map((data) => (
        <li className={styles.comment}>
          <Comment key={data.id} {...data} />
        </li>
      ))}
    </ul>
  );
};
