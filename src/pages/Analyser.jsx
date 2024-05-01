import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/shared/Header';
import { StarIcon } from '../components/shared/materialIcons';
import { Link } from 'react-router-dom';

const Analyser = () => {

  const [appResults, setAppResults] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [insights, setInsights] = useState([]);
  const [reviewFilter, setReviewFilter] = useState('All');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get('app');

  const reviewFilters = ['All', 'most-helpful', 'positive', 'critical']

  /**
   * @param {*} appId The unique identifier for the app
   * @description Fetches the app details from the google play store
   */
  function fetchDetails(appId) {
    fetch("https://gplayapi.vercel.app/app?appId=" + appId)
      .then(response => response.json())
      .then(data => setAppResults(data))
      .catch(error => console.error(error));
  }

  /**
   * @param {*} appId The unique identifier for the app
   * @returns Reviews JSON data for the app
   */
  function fetchReviews(appId) {
    if (!appId) return;
    fetch(`https://gplayapi.vercel.app/reviews?appId=${appId}`)
      .then(response => response.json())
      .then(res => {
        setReviews(res.data)
      })
      .catch(err => console.error(err))
  }

  /**
   * 
   * @param {*} insightsResponse The response from the Gplayai gemini API
   * @description Sanitises the insights data from the API response to an iterable array of objects format
   */
  function sanitiseInsightsData(insightsResponse) {
    const { data } = insightsResponse;
    const filteredInsights = (String(data).replace("json", '').replace("\n", '').replace("   ", '').replace('```', '').replace('\n```', ''));
    setInsights(JSON.parse(filteredInsights))
  }

  async function analyseReview(reviewDetails) {
    await fetch("https://gplayaiapi.vercel.app/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userInput: reviewDetails })
    })
      .then(response => response.json())
      .then(response => {
        sanitiseInsightsData(response)
      })
      .catch(error => console.error(error))
  }


  async function analyseReviews() {
    if (reviews.length === 0) return;

    let reviewDetails = '';

    // Analyse the first 6 reviews only  
    // Due to the limitations of the free tier of the API, Bandwidth limitations of Vercel
    for (let index = 0; index <= 5; index++) {
      reviewDetails = reviewDetails + reviews[index]?.text + '\n';
    }
    await analyseReview(reviewDetails);
  }

  function sortReviews(filter) {
    switch (filter) {
      case 'most-helpful':
        return [...reviews].sort((initial, final) => final.thumbsUp - initial.thumbsUp);
      case 'positive':
        return [...reviews].filter(review => review.score >= 4);
      case 'critical':
        return [...reviews].filter(review => review.score <= 2);
      default:
        return reviews;
    }
  }

  useEffect(() => {
    fetchDetails(id)
    fetchReviews(id);
  }, [id, title])

  useEffect(() => {
    analyseReviews();
  }, [reviews]);

  const AppDetails = () => {
    const { title, icon, developer, scoreText, url } = appResults;
    return (
      <div className="container flex flex-col items-center p-4 mx-auto justify-evenly md:flex-row">
        <div className='flex items-center'>
          <img src={icon} alt={title} className="w-40 h-40 rounded-md" />
          <div className="flex flex-col items-center">
            <div className="p-2 text-2xl font-bold text-gray-800 lg:text-4xl">{title}</div>
            <div className='p-2 text-lg text-blue-400 lg:text-2xl'>{developer}</div>
          </div>
          <h3 className='flex items-center px-4 text-lg lg:text-2xl'>{scoreText} <StarIcon /></h3>
        </div>
        <div className='flex items-center text-sm'>
          <Link to={url} className='px-8 py-3 my-6 text-lg text-white bg-green-500 rounded my6 hover:bg-green-400 hover:font-bold'> Download from Play store</Link>
        </div>
      </div>
    )
  }

  const ReviewsFilter = () => {
    return (
      <>
        <div className="reviews-filter">
          <div className='flex items-center p-2'>
            <span className="text-xl">Filter</span>
            <span className="material-icons">filter_list</span>
          </div>
          {reviewFilters.map((filter) => (
            <button key={filter} onClick={() => setReviewFilter(filter)} className={`px-3 lg:px-6 py-3 mx-1 text-sm text-gray-600 bg-white border-2 border-black hover:bg-zinc-700 hover:text-white lg:text-lg rounded-xl ${reviewFilter === filter ? 'bg-zinc-900 border-blue-500 text-white' : ''}`}>
              {filter}
            </button>
          ))}
        </div>
      </>
    )
  }

  const Review = ({ details }) => {
    const { id, version, date, userName, userImage, scoreText, text, thumbsUp } = details;
    return (
      <div key={id}>
        <div className="p-4 m-2 border rounded-md ">
          <div className="flex items-center justify-evenly">
            <img src={userImage} alt={userName} className="w-10 h-10 rounded-full" />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">{userName}</h3>
              <p className="text-gray-600">{new Date(date).toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <span> {scoreText}  </span>
              <span className="material-icons">star</span>
            </div>
          </div>
          <p className="p-2 leading-relaxed text-gray-600">{text}</p>
          <div className="text-sm font-bold text-blue-500">V {version}</div>
          <span className="text-sm material-icons">people</span>
          <span>{thumbsUp} found this useful</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <AppDetails />
      <div className="container p-4 mx-auto">
        <div className="reviews-container">
          <h2 className='p-4 text-2xl font-bold lg:text-4xl'>Reviews</h2>
          <ReviewsFilter />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortReviews(reviewFilter).map((review) => (
              <Review key={review.id} details={review} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Analyser