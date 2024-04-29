import  { useState } from 'react'
import { SearchBar } from '../shared/materialIcons';
import SearchRecommendations from '../Recommendations/SearchRecommedations';

const EntrySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <div className="flex items-center justify-center py-4 searchbar">
                <input type="text" placeholder='Search Apps & Games' className='w-3/5 px-2 py-3 text-gray-700 border-2 border-black rounded-3xl lg:w-2/5 lg:text-lg md:text-xl focus:border-gray-950' onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} onFocusCapture={() => {
                }}
                    autoFocus={true}
                />
                <SearchBar />
            </div>

            {/* Render the search recommendations component when the search term is not empty */}
            {searchTerm && (
                <SearchRecommendations searchTerm={searchTerm} />
            )}
        </>
    )
}

export default EntrySearch