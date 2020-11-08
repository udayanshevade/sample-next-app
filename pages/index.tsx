import useSwr from 'swr';
import Link from 'next/link';
import Head from 'next/head';
import { Post, IPost } from '../components/Post';
import styles from '../styles/Home.module.css';
import { root } from '../apiConfig';

const fetcher = async (url: string): Promise<IPost[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const posts: IPost[] = await res.json();
  return posts;
};

const Home = () => {
  const { data, error } = useSwr(`${root}/posts`, fetcher);

  if (error) {
    return <span>{error}</span>;
  }

  if (!data) {
    return <span>Loading posts data...</span>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sample Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>Posts</h1>
        <ul className={styles.posts}>
          {data.map(({ id, userId, title, body }: IPost) => (
            <li key={`post-${id}`} className={styles.post}>
              <Link href={`/post/${id}`} passHref>
                <div className={styles.postInner}>
                  <Post id={id} userId={userId} title={title} body={body} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
