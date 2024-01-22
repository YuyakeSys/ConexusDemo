// ./src/app/posts/page.jsx
"use client";

import { useState, useEffect } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Created at: {post.created_at}</p>
            <p>Updated at: {post.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ClientPostsPage() {
  return <PostsPage />;
}
