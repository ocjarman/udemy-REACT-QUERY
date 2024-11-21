import { useState, useEffect } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    // only fetching for page 1-9 since on page 10 theres no data to prefetch
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
      }); //prefetch  next page so no loading delay
    }
  }, [currentPage]);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["posts", currentPage], // always an array, and unique; when the page changes, react query will update the data
    queryFn: () => fetchPosts(currentPage), //need anon fxn when passing arguments to fxn
    staleTime: 2000, //2 seconds, fresh for 2 seconds and then turns stale; data must be stale for a "refetch" to occur
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updateTitleMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <h3>Oops, something went wrong!</h3>;<p>Error: {error.message}</p>
      </>
    );
  }

  if (!data) return <p>no data!</p>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              deleteMutation.reset(); // ensures delete mutation message does not linger
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          updateTitleMutation={updateTitleMutation}
        />
      )}
    </>
  );
}
