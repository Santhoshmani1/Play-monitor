import EntrySearch from './EntrySearch'

const HomeSearch = () => {
    return (
        <div id='home-search' className='bg-white'>
            <h2 className='w-4/5 p-4 mx-auto text-3xl font-bold text-center text-green-600 lg:text-5xl'>Analyse millions of Apps & Games available on Google play store</h2>
            <div className='min-h-80'>
                <EntrySearch />
            </div>
        </div>
    )
}

export default HomeSearch