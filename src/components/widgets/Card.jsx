import Image from 'next/image'
import { ICONS } from '../Theme'
import { RxArrowRight } from 'react-icons/rx'

export default function Card(props) {

    const {
        kicker = '',
        title = '',
        description = '',
        logos = [],
        videoUrl = '',
        videoThumbnail = '',
        openModal,
        handleClick
    } = props

    const playButton = ICONS['play']

    return (
        <div className='mt-20 w-full flex flex-col md:flex-row min-h-[600px]'>
            <div onClick={() => handleClick(videoUrl)} className='order-1 basis-1/2 bg-slate-100 relative overflow-hidden group hover:cursor-pointer m-8'>
                <Image 
                    src={videoThumbnail} alt='sports medicine video thumbnail'
                    fill={true}
                    className='object-cover group-hover:scale-105 transition ease-in-out duration-500' 
                />
                <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                    <Image 
                        src={playButton} alt='play button'
                        className='w-24 h-24 lg:w-36 lg:h-36 lg:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500 bg-white/30 rounded-full' 
                    />
                </div>
            </div>
            <div className='order-2 basis-1/2 bg-white flex flex-col justify-center items-start px-8 py-16'>
                <div className='max-w-lg'>
                    <h3 className='font-bold text-arnotBlue'>{kicker.toUpperCase()}</h3>
                    <h2 className='text-4xl mt-8 font-light'>{title}</h2>
                    <p className='mt-8'>{description}</p>
                    <div className='mt-12 hidden lg:flex'>
                        <div className='mr-8 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                        <div className='mr-8 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                        <div className='mr-8 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                    </div>
                    <div className='mt-12 block md:hidden'>
                        <button 
                            onClick={() => handleClick(videoUrl)} 
                            className={`
                                text-md text-arnotBlue
                                flex justify-center items-center 
                                group 
                                transition ease-in-out duration-300
                            `}
                        >
                            <div>Watch Video</div>
                            <RxArrowRight 
                                className={`
                                    text-xl ml-2 
                                    group-hover:translate-x-1 transition ease-in-out duration-300
                                `} 
                            />
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
