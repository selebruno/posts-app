import { createContext, useContext } from 'react';
import { IPosts } from '../App';

export interface IPostsContext {
  posts: IPosts[] | null;
}
const PostsContext = createContext<IPostsContext>({
  posts: null
});

export const usePostsContext = () => useContext(PostsContext);
export default PostsContext;
