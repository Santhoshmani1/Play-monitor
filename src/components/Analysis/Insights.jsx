import { useState } from 'react';
import { AddCircle, BugReport, Mobile } from '../shared/materialIcons';

const AppInsights = ({ appInsights }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const featureRequests = appInsights.filter(insight => insight.Category === 'feature-request');
    const bugFixes = appInsights.filter(insight => insight.Category === 'bug-fix');
    const designs = appInsights.filter(insight => insight.Category === 'design');

    return (
        <div className="container p-4 mx-auto bg-slate-50">
            <h2 className='p-2 text-3xl font-bold text-orange-500 lg:text-4xl'>Insights</h2>
            {appInsights && (
                <>
                    <div className='flex flex-col items-center justify-between'>
                        <div className='px-4 py-2'>
                            <h3 className='text-xl font-bold text-green-500 lg:text-2xl'>New Feature requests</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                {featureRequests.map((insight, index) => {
                                    const { Title } = insight;
                                    return (
                                        <div key={index} className='flex items-center px-2 py-2 m-2 text-gray-800 duration-500 rounded hover:bg-green-400 hover:text-white hover:font-bold hover:cursor-pointer'>
                                            <AddCircle style={{ color: "green" }} />
                                            <p className='px-2 py-2 text-lg lg:text-xl'>{Title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='px-4 py-2'>
                            <h3 className='text-xl font-bold text-red-500 lg:text-2xl'>Bug fixes</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                {bugFixes.map((insight, index) => {
                                    const { Title } = insight;
                                    return (
                                        <div key={index} className='flex items-center px-4 py-2 m-2 text-gray-800 duration-500 rounded hover:bg-red-400 hover:text-white hover:font-bold hover:cursor-pointer'>
                                            <BugReport />
                                            <p className='px-3 py-2 text-lg lg:text-xl'>{Title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='px-4 py-2'>
                            <h3 className='text-xl font-bold text-blue-500 lg:text-2xl'>Design / UI improvements</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                                {designs.map((insight, index) => {
                                    const { Title } = insight;
                                    return (
                                        <div key={index} className='flex items-center px-4 py-2 m-2 text-gray-800 duration-500 rounded hover:bg-blue-400 hover:text-white hover:font-bold hover:cursor-pointer'>
                                            <Mobile />
                                            <p className='p-2 px-3 text-lg lg:text-xl'>{Title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AppInsights;