import PostItem from "../PostItem";

const PostLists = ({ isPermitDetailPost, posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <PostItem
            key={post.id}
            isPermitDetailPost={isPermitDetailPost}
            {...post}
          />
        );
      })}
    </div>
  );
};

export default PostLists;
