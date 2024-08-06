"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const OtherProfile = () => {
  const searchParams = useSearchParams();
  const otherUserId = searchParams.get("id");

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("Guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${otherUserId}/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
        if (data.length > 0 && data[0].creator) {
          setUsername(data[0].creator.username);
        }
      } catch (error) {
        console.error('Error fetching prompts:', error);
        // Optionally set an error state to display an error message
      } finally {
        setLoading(false);
      }
    };

    if (otherUserId) {
      fetchPrompts();
    } else {
      setLoading(false); // No userId provided, stop loading
    }
  }, [otherUserId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Profile
      name={username.toUpperCase()}
      desc={`Welcome to ${username}'s personalized profile page`}
      data={posts}
    />
  );
};

export default OtherProfile;
