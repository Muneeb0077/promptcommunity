"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const OtherProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const otherUserId = searchParams.get("id");

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchprompts = async () => {
      try {
        const response = await fetch(`/api/users/${otherUserId}/posts`);
        const data = await response.json();
        setPosts(data);
        if (data.length > 0) {
          setUsername(data[0].creator.username);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (otherUserId) {
      fetchprompts();
    }
  }, [otherUserId]);

  return (
    <Profile name={username.toUpperCase()} desc={`Welcome to ${username}'s personalised profile page`} data={posts} />
  );
}

export default OtherProfile;
