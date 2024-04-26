import React from 'react'
import { Link } from 'react-router-dom';
import { Download, Mail, Shield, Location, StarIcon, Website, Person } from '../shared/materialIcons';

const AppDetails = ({ details }) => {
    const { title, description, summary, scoreText, installs, contentRating, screenshots, icon, updated, recentChanges ,developer, developerEmail, developerWebsite, developerAddress, histogram, privacyPolicy } = details;

    function getTotalReviews() {
        if (histogram === undefined)
            return;
        let total = 0;
        for (const key in histogram) {
            total += histogram[key];
        }
        return total;
    }

    function getTotalReviewsString() {
        const total = getTotalReviews();
        if (total === 0) return 0;
        else if (total > 1000000) return (total / 1000000).toFixed(1) + "M";
        else if (total > 10000) return (total / 1000).toFixed(1) + "K";
        else return total;
    }

    function getDownloads() {
        if (installs === undefined)
            return;
        return (installs.replace(/,/g, "").replace("+", ""));
    }

    function getDownloadsString() {
        const totalDownloads = getDownloads();
        if (totalDownloads === undefined) return;
        else if (totalDownloads >= 1000000000) return (totalDownloads / 1000000000).toFixed(1) + "B";
        else if (totalDownloads >= 1000000) return (totalDownloads / 1000000).toFixed(1) + "M";
        else if (totalDownloads >= 1000) return (totalDownloads / 1000).toFixed(1) + "K";
        else return totalDownloads.toString();
    }

    function getHistogramRepresentation() {

        if (histogram === undefined)
            return;

        const totalPercentage = 100;
        const histogramRepresentation = {};

        for (const key in histogram) {
            histogramRepresentation[key] = (histogram[key] / getTotalReviews()) * 100;
        }

        return histogramRepresentation;
    }

    function PrimaryDetails() {
        return (
            <>
                <div className='flex justify-evenly items-center p-6'>
                    <img src={icon} alt={title} className='md:w-60 w-28 shadow-xl shadow-gray-800 m-2 rounded-xl ' />
                    <div className='flex justify-start flex-col'>
                        <h2 className='font-bold p-2 lg:text-5xl text-xl'>{title}</h2>
                        <h3 className='text-slate-700 text-lg lg:text-3xl p-2'>{developer}</h3>
                        <div className='text-center p-4 text-lg lg:text-2xl'>{summary}</div>
                        <div className="cta mx-auto p-4">
                            <button className='p-4 m-2 text-lg bg-blue-900 hover:bg-blue-500 text-gray-50 font-bold shadow-xl shadow-gray-800 hover:shadow-gray-600 rounded-2xl px-12'>✨ Analyse App with Google AI ✨</button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly items-center p-6 w-full'>
                    <div className='flex items-center justify-center p-2 flex-col'>
                        <span className='text-lg lg:text-2xl flex'> {scoreText} <StarIcon /></span>
                        <span className='text-lg lg:text-2xl p-2'>{getTotalReviewsString()} Reviews</span>
                    </div>
                    <div className='flex items-center justify-center p-2 flex-col'>
                        <span className='text-lg lg:text-2xl flex items-center'>
                            {(getDownloadsString())}  <Download />
                        </span>                        <span className='text-lg lg:text-2xl p-2'>Downloads</span>
                    </div>
                    <div className='flex items-center justify-center p-2 flex-col'>
                        <Person />
                        <span className='text-lg lg:text-2xl p-2'>{contentRating}</span>
                    </div>
                </div>
            </>
        )
    }


    function ScreenshotCarousel() {
        return (
            <>
                <div className='screenshots-carousel'>
                    <div className='flex overflow-x-scroll sm:mx-40'>
                        {screenshots && screenshots.map((screenshot, index) => (
                            <img src={screenshot} alt={title + "screenshot" + index} key={index} className='w-96 h-auto px-1 py-2 rounded-xl' />
                        ))}
                    </div>
                </div>
            </>
        )
    }

    function LatestUpdate() {
        return (
            <>
                <div className='latest-update'>
                    <h2 className='lg:text-4xl text-2xl font-bold p-4'>Latest Update</h2>
                    <div className='p-4'>
                        <h3 className='text-lg font-bold'>What's New</h3>
                        <p className='text-lg text-gray-700'>{recentChanges}</p>
                    </div>
                    <div className='p-4'>
                        <h3 className='text-lg font-bold'>Last Updated on</h3>
                        <p className='text-lg text-gray-700'>{new Date(updated).toLocaleDateString()}</p>
                        </div>
                </div>
            </>
        )
    }

    function HistogramBar({ percentage, label }) {
        return (
            <>
                <div className='w-1/2 mx-auto flex items-center justify-evenly'>
                    <span className='px-2 text-lg text-gray-600 '>{label}</span>
                    <div className='w-full h-3 bg-gray-300 rounded-xl'>
                        <div className='rounded-lg h-full' style={{ width: `${percentage}%`, backgroundColor: 'green' }} />
                    </div>
                </div>
            </>
        );
    }

    function ReviewsHistogram() {
        return (
            <>
                <h2 className='lg:text-4xl text-2xl font-bold p-4'>App Reviews</h2>

                <div className='flex justify-center items-center w-full md:flex-row flex-col'>
                    <div className='text-4xl flex flex-col items-center'>
                        <div className='font-bold'>
                            {scoreText} <StarIcon />
                        </div>                        <div>
                            {getTotalReviewsString()} Reviews
                        </div>
                    </div>

                    <div className='lg:min-w-[800px]'>
                        {histogramRepresentation && Object.keys(histogramRepresentation).map(key => (
                            <HistogramBar
                                key={key}
                                label={6 - key}
                                percentage={histogramRepresentation[6 - key]}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    }

    function DeveloperDetails() {
        return (
            <>
                <div className="developer-details">
                    <h2 className='lg:text-4xl text-2xl font-bold p-4'>Developer Details</h2>

                    <div className='px-4 py-2'>
                        {developerWebsite && (<div className="">
                            <a href={developerWebsite} target="_blank" rel="noreferrer" className='text-lg px-2 flex items-center justify-start'>
                                <Website />
                                Website
                            </a>
                        </div>
                        )}
                        <div className="">
                            <div className='font-black p-2'>Support Email</div>
                            <div className='text-lg px-2'>
                                <a className='flex items-center justify-start' href={"mailto:" + developerEmail}>
                                    <Mail /> {developerEmail}</a>
                            </div>
                        </div>
                        <div>
                            <div className='font-black p-2'>Address</div>
                            <div className="text-lg px-2 flex items-center justify-start"> <Location />{developerAddress}</div>
                        </div>
                        <div className="privacy-policy">
                            <div className="font-black p-2">
                                Privacy Policy
                            </div>
                            <div className="text-lg px-2">
                                <a href={privacyPolicy} target='_blank' rel='noreferrer' className='flex items-center justify-start'>
                                    <Shield />
                                    {privacyPolicy}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const totalReviews = getTotalReviewsString();
    const histogramRepresentation = getHistogramRepresentation();

    return (
        <>

            <PrimaryDetails />
            <ScreenshotCarousel />
            <LatestUpdate />
            <ReviewsHistogram />
            <DeveloperDetails />
        </>
    )
}

export default AppDetails