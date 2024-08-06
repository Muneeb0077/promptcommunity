"use client";

import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';
import { useRouter } from 'next/navigation';


const PromptCardList = ({data, handleTagClick,handleUsernameClick}) => {
  
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} handleUsernameClick={handleUsernameClick}  />
      ))} 
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  

  useEffect(() => {
    const fetchprompts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchprompts();
  }, [])

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    if(e.target.value === "") {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      const filteredPrompts = prompts.filter((prompt) => prompt.tag.includes(e.target.value) || prompt.creator.username.includes(e.target.value) || prompt.prompt.includes(e.target.value));
      setPrompts(filteredPrompts);
    }
  };

  const handleTagClick = async (tag) => {
    handleSearch({target: {value: tag}});
  };

  
  const handleUsernameClick = (prompt) => {
    router.push(`/other-user-profile?id=${prompt.creator._id}`);
  };
  

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input type="text" placeholder="Search for tags, username and prompts" className="search_input peer" value={searchText} onChange={handleSearch} />
      </form>

      <PromptCardList data={prompts} handleTagClick={handleTagClick} handleUsernameClick={handleUsernameClick} />

    </section>
  )
}

export default Feed