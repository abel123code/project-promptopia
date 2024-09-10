'use client'
import React from 'react'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClicking}) => {
    console.log(data);

    return (
        <div className='mt-16 prompt_layout'>
            {data.length > 0 ? (
                data.map((post) => (
                    <PromptCard 
                        key={post._id}
                        post={post}
                        handleTagClicking={handleTagClicking}
                    />
                ))
            ) : (
               <>

               </>
            )}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json();

            setPosts(data);
            setFilteredPosts(data);
        }

        fetchPosts()
    },[])

    // Update the search text as the user types
    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchText(searchValue);

        // Filter posts based on prompt, creator name, or tag
        const filtered = posts.filter((post) =>
            post.prompt.toLowerCase().includes(searchValue) || 
            post.creator.username.toLowerCase().includes(searchValue) || 
            post.tag.toLowerCase().includes(searchValue)
        );

        setFilteredPosts(filtered);
    };

    // Handle tag clicking, input the tag value into the search bar, and filter posts
    const handleTagClicking = (tag) => {
        console.log('tag has been clicked')
        const tagValue = tag.toLowerCase();
        setSearchText(tagValue);  // Update the search input with the clicked tag

        // Filter posts to show only the ones that match the clicked tag
        const filtered = posts.filter((post) =>
            post.tag.toLowerCase().includes(tagValue)
        );

        setFilteredPosts(filtered);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                    type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />

            </form>

            <PromptCardList 
                data={filteredPosts}
                handleTagClicking={handleTagClicking}
            />
        </section>
    )
}

export default Feed