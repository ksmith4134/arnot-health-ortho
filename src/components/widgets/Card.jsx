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
        <div className='py-24 max-w-6xl px-8 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div onClick={() => handleClick(videoUrl)} className='relative overflow-hidden group hover:cursor-pointer rounded-md min-h-[200px]'>
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
            <div className='flex flex-col justify-center items-start w-full'>
                <div className='border rounded-md p-8'>

                    <TitleBlock alignBlock={'left'} icon={icon} kicker={kicker} title={title} subTitle={description} />
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
