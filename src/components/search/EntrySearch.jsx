import React, { useState } from 'react'
import { SearchBar } from '../shared/materialIcons';
import SearchRecommendations from '../Recommendations/SearchRecommedations';

const EntrySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [recommendationsVisibility, setRecommendationsVisibility] = useState(false);

    return (
        <>
            <div className="search-info font-sans">
                <h2 className='text-center lg:text-3xl text-xl p-5 text-yellow-400 font-sans font-bold'>
                    Analyse your favourite applications on Google play store
                </h2>
            </div>

            <div className="searchbar flex justify-center items-center">
                <input type="text" placeholder='Search Apps & Games' className='py-2 w-3/5 lg:w-2/5 px-2 text-2xl  focus:border-white text-gray-700 rounded-xl border-gray-500 border-2 ' onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} onFocusCapture={() => {
                    setRecommendationsVisibility(true)
                    console.log(recommendationsVisibility)
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