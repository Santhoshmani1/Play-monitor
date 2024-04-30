import { useState, useEffect } from 'react';
import { SearchBar, ArrowOutward } from '../shared/materialIcons';
import { Link } from 'react-router-dom';

const SearchRecommendations = ({ searchTerm }) => {
    const [suggestions, setSuggestions] = useState(["Gmail", "Drive", "Chrome", "Maps"]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

    // Fetch search suggestions from the API and update the state with the suggestions
    // when the search term changes or the component mounts
    useEffect(() => {
        fetch("https://gplayapi.vercel.app/suggest?term=" + searchTerm)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length >= 4) {
                    setSuggestions(data);
                }
            })
            .catch(error => console.error(error));
    }, [searchTerm]);

    // Add event listener to handle keyboard navigation through the suggestions
    // when the selected suggestion index or the suggestions array changes
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
            } else if (e.key === 'ArrowUp' && selectedSuggestionIndex > 0) {
                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedSuggestionIndex, suggestions.length]);

    // Render the search suggestions with the selected suggestion highlighted
    // based on the selectedSuggestionIndex state value 
    return (
        <div className='flex flex-col items-center justify-center mt-0.5 ml-6 font-sans'>
            {suggestions.map((suggestion, index) => (
                <Link to={"/apps/" + suggestion} key={index} className={`py-2 w-3/4 md:2/3 lg:w-2/5 mr-14 bg-zinc-50 flex text-lg items-center justify-between pr-4 ${index === selectedSuggestionIndex ? 'bg-zinc-200 text-blue-400 font-bold border-none' : ''}`}>
                    <div className='flex'>
                        <div className='px-2'>
                            <SearchBar />
                        </div>
                        <div>
                            {suggestion}
                        </div>
                    </div>
                    <div>
                        <ArrowOutward />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SearchRecommendations;