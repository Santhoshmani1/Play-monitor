import React from 'react'
import { PlayIcon } from './materialIcons'

const Header = () => {
    return (
        <>
            <header className='p-2 lg:p-3 bg-black flex justify-between items-center'>
                <div className='flex'>
                    <PlayIcon style={{ fontSize: "40px", color: "#069aed" }} />
                    <h1 className='text-white font-bold text-3xl font-sans'>Play Monitor </h1>
                </div>
            </header>
        </>
    )
}

export default Header