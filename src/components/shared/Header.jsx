import React from 'react'
import { PlayIcon } from './materialIcons'

const Header = () => {
    return (
        <>
            <header className='p-2 lg:p-4 bg-black flex justify-between items-center'>
                <div className='flex'>
                    <PlayIcon style={{ fontSize: "40px", color: "#069aed" }} />
                    <h1 className='text-white font-bold text-3xl font-sans'>Play Monitor </h1>
                </div>
                <div className="call-to-action-btn">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded">
                        Sign In
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header