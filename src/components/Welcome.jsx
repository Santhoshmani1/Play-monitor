import { playStoreIcon } from '../assets'
import { HashLink as Link } from 'react-router-hash-link'

// Welcome Component for the Home page  
// containing description and call to action to search section 
const Welcome = () => {
    return (
        <>
            <div className="flex flex-col-reverse items-center justify-center p-4 font-sans home-content search-info md:flex-row">
                <div className='flex flex-col items-center justify-center lg:w-4/5'>
                    <div>
                        <h2 className='p-12 font-sans text-5xl font-bold leading-tight text-center lg:text-6xl lg:px-12 lg:leading-tight animate-pulse' style={{ color: "#202124", letterSpacing: "0.10px" }}>
                            Analyse your favourite mobile apps from Google play store
                        </h2>
                    </div>

                    <div className='p-2 text-3xl font-bold text-blue-600 lg:text-4xl'>
                        <h2 className='lg:text-2xl'>With Gemini 1.5 Pro</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 font-sans home-cta search-info md:flex-row">
                        <Link to={"#home-search"} className='px-6 py-4 font-sans font-semibold tracking-wide text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-800'>Get started</Link>
                    </div>
                </div>

                <img src={playStoreIcon} alt="Google play icon" className='w-2/5 m-2 mx-auto rounded lg:w-1/3' />
            </div>

        </>
    )
}

export default Welcome