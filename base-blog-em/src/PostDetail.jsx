import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateTitlemutation }) {
  // replace with useQuery
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["comments", post.id], // when key changes, create a new query
    queryFn: () => fetchComments(post.id), // parameters should be part of the key
  });

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{" "}
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post....</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">
            Successfully deleted the post (but not really).
          </p>
        )}
      </div>
      <div>
        <button onClick={() => updateTitlemutation.mutate(post.id)}>
          Update title
        </button>
        {updateTitlemutation.isPending && (
          <p className="loading">Updating the post....</p>
        )}
        {updateTitlemutation.isError && (
          <p className="error">
            Error updating the post: {updateTitlemutation.error.toString()}
          </p>
        )}
        {updateTitlemutation.isSuccess && (
          <p className="success">
            Successfully updated the post (but not really).
          </p>
        )}
        <p>{post.body}</p>
        <h4>Comments</h4>
        {data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </div>
    </>
  );
}
