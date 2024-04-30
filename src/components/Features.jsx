import { SearchBar, Insights, Explore, Bolt } from "./shared/materialIcons"
import { discoverPreview, searchPreview, similar } from "../assets"

const Features = () => {

    const featuresData = [
        {
            title: 'Enhanced Search experience',
            icon: <SearchBar style={{ fontSize: "60px", color: "#069aed" }} />,
            description: "Search through millions of apps on Google Play Store with ease. Get search recommendations as you type",
            previewImage: searchPreview,
        },
        {
            title: 'Discover apps and games',
            icon: <Explore style={{ fontSize: "60px", color: "#069aed" }} />,
            description: "Discover new apps and games. Get features, reviews, latest product updates and more.",
            previewImage: discoverPreview,
        },
        {
            title: 'Get Similar apps suggestions',
            icon: <Bolt style={{ fontSize: "60px", color: "#069aed" }} />,
            description: "Get insights on app performance, ratings, reviews, and more. Compare apps and games to make informed decisions.",
            previewImage: similar,
        },
        {
            title: 'Analyse & Gain insights',
            icon: <Insights style={{ fontSize: "60px", color: "#069aed" }} />,
            description: "Know what your users are asking for. Get insights on feature requests, bugs and design improvements from user reviews",
            previewImage: "",
        },

    ]

    return (
        <div className="p-2 font-sans bg-slate-50 lg:grid-cols-1 lg:items-center lg:grid justify-items-center" tabIndex={-1}>
            {
                featuresData.map((feature, index) => {
                    return (
                        <>
                            <div key={index} className='flex flex-col items-center justify-center my-8 mx-uto searchbar'>
                                <div className="flex items-center px-2 py-4">
                                    <div>{feature.icon}</div>
                                    <h2 className='px-2 py-4 font-sans text-3xl font-bold leading-tight text-center text-orange-500 lg:text-4xl lg:px-12 lg:leading-tight animate-pulse' style={{ letterSpacing: "0.10px" }}>
                                        {feature.title}
                                    </h2>
                                </div>
                                <p className="px-4 pb-4 text-xl leading-relaxed text-center text-gray-900 md:w-3/4 lg:text-2xl">{feature.description}</p>
                                <img src={feature.previewImage} alt="" className="w-3/4 h-auto rounded-lg lg:w-3/5" />
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Features
