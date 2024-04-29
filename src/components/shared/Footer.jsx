import { FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <>
            <footer className='p-4 bg-black text-white flex justify-between items-center'>
                <div className='lg:text-xl text-lg text-left mx-auto hover:text-blue-500 hover:font-bold'>
                    <a href='/' className='text-2xl font-bold'>Play monitor</a>
                </div>

                <div className='lg:text-xl text-lg text-center mx-auto hover:text-blue-400 font-semibold'>
                    <FaGithub className='inline mx-2' />
                    <a target='_blank' rel='noreferrer' href="https://github.com/santhoshmani1/play-monitor">Source code on Github</a>
                </div>      
            </footer>
        </>
    )
}

export default Footer
