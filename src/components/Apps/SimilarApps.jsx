import React from 'react'
import { useNavigate } from 'react-router-dom';

const SimilarApps = ({ apps }) => {
    const navigate = useNavigate();

    const openApp = (appName) => {
        navigate(`/apps/${appName}`)
    }

    return (
        <>
            <h2 className='lg:text-4xl text-2xl font-bold p-4'>Similar Apps</h2>
            <div className='flex overflow-x-scroll justify-center items-center'>
                {apps && apps.map((app, index) => (
                    <button onClick={() => openApp(app.title)} key={index} className='flex justify-evenly items-center flex-col p-2 m-2 bg-zinc-50'>
                        <img src={app.icon} alt={app.title} className='w-20 rounded-lg' />
                        <h3 className='text-lg px-4'>{app.title}</h3>
                    </button>
                ))}
            </div>
        </>
    )
}

export default SimilarApps
