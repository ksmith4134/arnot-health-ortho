import Image from 'next/image'
import { ICONS } from '../Theme'
import { RxArrowRight } from 'react-icons/rx'
import TitleBlock from '../Shared/TitleBlock'

export default function Card(props) {

    const {
        icon = '',
        kicker = '',
        title = '',
        description = '',
        logos = [],
        videoUrl = '',
        videoThumbnail = '',
        handleClick
    } = props

    const playButton = ICONS['play']

    return (
        <div className='py-24 max-w-6xl px-8 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div onClick={() => handleClick(videoUrl)} className='relative overflow-hidden group hover:cursor-pointer rounded-md min-h-[200px]'>
                    <Image 
                        src={videoThumbnail} alt='sports medicine video thumbnail'
                        fill={true}
                        className='object-cover group-hover:scale-105 transition ease-in-out duration-500' 
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                        <Image 
                            src={playButton} alt='play button'
                            className='w-24 h-24 lg:w-36 lg:h-36 lg:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500 bg-gray-800/20 rounded-full border-2 border-white' 
                        />
                    </div>
                </div>
                <div className='border rounded-md px-8 py-16 shadow-lg shadow-slate-50'>
                    <TitleBlock alignBlock={'left'} icon={icon} kicker={kicker} title={title} subTitle={description} />
                    <div className='mt-12'>
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
            {/* TEAM LOGOS */}
            <div className='mt-8 p-8 border rounded-md flex justify-center items-center mx-auto'>
                <div className='mr-16 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                <div className='mr-16 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                <div className='mr-16 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                <div className='mr-16 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
            </div>
        </div>
    )
}
