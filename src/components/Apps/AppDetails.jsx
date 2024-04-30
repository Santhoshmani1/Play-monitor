import React from 'react'
import { Download, Mail, Shield, Location, StarIcon, Website, Person } from '../shared/materialIcons';
import { useNavigate } from 'react-router-dom';

const AppDetails = ({ details }) => {

    const { appId, title, description, summary, scoreText, installs, contentRating, screenshots, icon, updated, recentChanges, developer, developerEmail, developerWebsite, developerAddress, histogram, privacyPolicy } = details;
    const navigate = useNavigate();


    // Function to navigate to the analyse page with the app id and title
    const analyseApp = (id, title) => {
        if (!id) return;
        navigate(`/analyse?app=${title}&id=${id}`)
    }

    // Helper functions to get the total reviews, downloads, and histogram representation

    /**
     * @description Get the total number of reviews for the app from the reviews histogram
     * @returns {number} Total number of reviews for the app
     */
    function getTotalReviews() {
        if (histogram === undefined)
            return;

        let total = 0;
        for (const key in histogram) {
            total += histogram[key];
        }

        return total;
    }

    /**
     * @description Get the total number of reviews for the app in a human-readable format
     * @returns {string} Total reviews in a human-readable format
     * @example 1000 => 1K, 1000000 => 1M, 1000000000 => 1B
     */
    function getTotalReviewsString() {
        const total = getTotalReviews();
        if (total === 0) return 0;
        else if (total > 1000000) return (total / 1000000).toFixed(1) + "M";
        else if (total > 10000) return (total / 1000).toFixed(1) + "K";
        else return total;
    }

    /**
     * @description Get the total number of downloads for the app from the installs field
     * @returns {number} Total number of downloads for the app
     * @example 10,000,000 => 10000000
     */
    function getDownloads() {
        if (installs === undefined)
            return;
        return (installs.replace(/,/g, "").replace("+", ""));
    }

    /**
     * @description Get the total number of downloads for the app in a human-readable format
     * @returns {string} Total downloads in a human-readable format
     * @example 1000 => 1K, 1000000 => 1M, 1000000000 => 1B
     */
    function getDownloadsString() {
        const totalDownloads = getDownloads();
        if (totalDownloads === undefined) return;
        else if (totalDownloads >= 1000000000) return (totalDownloads / 1000000000).toFixed(1) + "B";
        else if (totalDownloads >= 1000000) return (totalDownloads / 1000000).toFixed(1) + "M";
        else if (totalDownloads >= 1000) return (totalDownloads / 1000).toFixed(1) + "K";
        else return totalDownloads.toString();
    }

    /**
     * @description Get the histogram representation of the reviews sums to 100%
     * @returns {object} Histogram representation of the reviews
     * @example {1 : 10, 2: 20, 3: 30, 4: 40, 5: 50} => {1: 10%, 2: 20%, 3: 30%, 4: 40%, 5: 50%}
     */
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

    /**
     * @description Primary Details Component - Displays the primary details of the app - title, developer, summary, icon, and CTA
     * @returns JSX Element containing the primary details of the app
     */
    function PrimaryDetails() {
        return (
            <>
                <div className='flex items-center p-6 justify-evenly'>
                    <img src={icon} alt={title} className='m-2 shadow-xl md:w-60 w-28 shadow-gray-800 rounded-xl ' />
                    <div className='flex flex-col justify-start'>
                        <h2 className='p-2 text-xl font-bold lg:text-5xl'>{title}</h2>
                        <h3 className='p-2 text-lg text-slate-700 lg:text-3xl'>{developer}</h3>
                        <div className='p-4 text-lg text-center lg:text-2xl'>{summary}</div>
                        <div className="p-4 mx-auto cta">
                            <button onClick={() => analyseApp(appId, title)} className='p-4 px-12 m-2 text-lg font-bold bg-blue-900 shadow-xl hover:bg-blue-500 text-gray-50 shadow-gray-800 hover:shadow-gray-600 rounded-2xl'>✨ Analyse App with Google AI ✨</button>
                        </div>
                    </div>
                </div>
                <div className='flex items-center w-full p-6 justify-evenly'>
                    <div className='flex flex-col items-center justify-center p-2'>
                        <span className='flex text-lg lg:text-2xl'> {scoreText} <StarIcon /></span>
                        <span className='p-2 text-lg lg:text-2xl'>{getTotalReviewsString()} Reviews</span>
                    </div>
                    <div className='flex flex-col items-center justify-center p-2'>
                        <span className='flex items-center text-lg lg:text-2xl'>
                            {(getDownloadsString())}  <Download />
                        </span>                        <span className='p-2 text-lg lg:text-2xl'>Downloads</span>
                    </div>
                    <div className='flex flex-col items-center justify-center p-2'>
                        <Person />
                        <span className='p-2 text-lg lg:text-2xl'>{contentRating}</span>
                    </div>
                </div>
            </>
        )
    }

    /**
     * @description Screenshot Carousel Component - Displays the screenshots of the app in a horizontal scrollable carousel
     * @returns JSX Element containing the screenshots of the app
     */
    function ScreenshotCarousel() {
        return (
            <>
                <div className='screenshots-carousel'>
                    <div className='flex overflow-x-scroll sm:mx-10 md:mx-20 lg:mx-40'>
                        {screenshots && screenshots.map((screenshot, index) => (
                            <img src={screenshot} alt={title + "screenshot" + index} key={index} className='h-auto px-1 py-2 w-96 rounded-xl' />
                        ))}
                    </div>
                </div>
            </>
        )
    }

    /**
     * @description Latest Update Component - Displays the latest update and the last updated date of the app
     * @returns JSX Element containing the latest update and last updated date of the app
     */
    function LatestUpdate() {
        return (
            <>
                <div className='latest-update'>
                    <h2 className='p-4 text-2xl font-bold lg:text-4xl'>Latest Update</h2>
                    <div className='p-4'>
                        <h3 className='text-lg font-bold'>What&apos;s New</h3>
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

    /**
     * @description Histogram Bar Component - Displays a histogram bar with a label and percentage
     * @param {float} percentage The percentage of the histogram bar - 0 to 100
     * @param label The label for the histogram bar - 1 to 5
     * @returns JSX Element containing the histogram bar with the label and percentage 
     */
    function HistogramBar({ percentage, label }) {
        return (
            <>
                <div className='flex items-center w-1/2 mx-auto justify-evenly'>
                    <span className='px-2 text-lg text-gray-600 '>{label}</span>
                    <div className='w-full h-3 bg-gray-300 rounded-xl'>
                        <div className='h-full rounded-lg' style={{ width: `${percentage}%`, backgroundColor: 'green' }} />
                    </div>
                </div>
            </>
        );
    }

    /**
     * @description Reviews Histogram Component - Displays the reviews histogram 
     * @returns JSX Element containing the Reviews Histogram - Score, Total Reviews, and Histogram Bars
     */
    function ReviewsHistogram() {
        return (
            <>
                <h2 className='p-4 text-2xl font-bold lg:text-4xl'>App Reviews</h2>

                <div className='flex flex-col items-center justify-center w-full md:flex-row'>
                    <div className='flex flex-col items-center text-4xl'>
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

    /**
     * @description Developer Details Component - Displays the developer details
     * @returns JSX Element containing the developer details - website, email, address, and privacy policy
     */
    function DeveloperDetails() {
        return (
            <>
                <div className="developer-details">
                    <h2 className='p-4 text-2xl font-bold lg:text-4xl'>Developer Details</h2>

                    <div className='px-4 py-2'>
                        {developerWebsite && (<div className="">
                            <a href={developerWebsite} target="_blank" rel="noreferrer" className='flex items-center justify-start px-2 text-lg'>
                                <Website />
                                Website
                            </a>
                        </div>
                        )}
                        <div className="">
                            <div className='p-2 font-black'>Support Email</div>
                            <div className='px-2 text-lg'>
                                <a className='flex items-center justify-start' href={"mailto:" + developerEmail}>
                                    <Mail /> {developerEmail}</a>
                            </div>
                        </div>
                        <div>
                            <div className='p-2 font-black'>Address</div>
                            <div className="flex items-center justify-start px-2 text-lg"> <Location />{developerAddress}</div>
                        </div>
                        <div className="privacy-policy">
                            <div className="p-2 font-black">
                                Privacy Policy
                            </div>
                            <div className="px-2 text-lg">
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
