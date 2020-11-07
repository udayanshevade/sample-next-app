import { useRouter } from 'next/router';
import Link from 'next/link';
import useSwr from 'swr';
import { Post } from './Post';
import { Comments } from './Comments';
import { root } from '../../apiConfig';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetcher = async (url: string): Promise<IPost> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('No such post found');
  }
  const data: IPost = await res.json();
  return data;
};

const PostPage = ({ className }) => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const { data, error } = useSwr(
    queryId && `${root}/posts/${queryId}`,
    fetcher
  );

  if (error) {
    return <pre>{error}</pre>;
  }

  if (!data) {
    return <span>Loading post...</span>;
  }

  const { id, userId, title, body } = data;

  return (
    <div className="post-details-container">
      <div className="post-details">
        <Post
          id={id}
          userId={userId}
          className={className}
          title={title}
          body={body}
        />
      </div>
      <section className="comments-container">
        <Comments postId={id} />
      </section>
    </div>
  );
};

export default PostPage;
