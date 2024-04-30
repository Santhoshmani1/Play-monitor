import React from 'react'
import { useNavigate } from 'react-router-dom';

const SimilarApps = ({ apps }) => {
    const navigate = useNavigate();

    const openApp = (appName) => {
        navigate(`/apps/${appName}`)
    }

    return (
        <>
            <h2 className='px-16 py-4 text-2xl font-bold lg:text-4xl '>Similar Apps</h2>
            <div className='flex items-center justify-center overflow-x-scroll pl-80 sm:pl-20 bg-slate-100'>
                {apps && apps.map((app, index) => (
                    <button onClick={() => openApp(app.title)} key={index} className='flex flex-col items-center p-2 m-2 justify-evenly'>
                        <img src={app.icon} alt={app.title} className='w-20 rounded-lg' />
                        <h3 className='px-4 text-lg'>{app.title}</h3>
                    </button>
                ))}
            </div>
        </>
    )
}

export default SimilarApps
