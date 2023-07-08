import TitleBlock from "../Shared/TitleBlock"
import Image from "next/image"
import { RxArrowRight } from "react-icons/rx"
import { ICONS } from "../Theme"


export default function VideoCard(props) {

    const {
        alignBlock = 'left',
        icon = null,
        kicker = null,
        title = null,
        subTitle = null,
        subTitleSize = 'medium',
        buttonLabel = null,
        videoUrl = null,
        image = null,
        openModal,
    } = props

    const playButton = ICONS['play']


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* TITLE CARD */}
            <div className='border rounded-md px-10 py-16 shadow-md shadow-slate-50'>
                <TitleBlock alignBlock={alignBlock} icon={icon} kicker={kicker} title={title} subTitle={subTitle} subTitleSize={subTitleSize} />
                <button onClick={() => openModal(videoUrl)} className='mt-8 text-md text-arnotBlue flex justify-center items-center group transition ease-in-out duration-300'>
                    <div>{buttonLabel}</div>
                    <RxArrowRight className='text-xl ml-2 group-hover:translate-x-1 transition ease-in-out duration-300' />
                </button>
            </div>
            {/* VIDEO CARD */}
            <div onClick={() => openModal(videoUrl)} className='relative overflow-hidden group hover:cursor-pointer rounded-md min-h-[200px]'>
                <Image 
                    src={image} alt='sports medicine video thumbnail'
                    fill={true}
                    className='object-cover group-hover:scale-105 transition ease-in-out duration-500' 
                />
                <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                    <Image 
                        src={playButton} alt='play button'
                        className='w-24 h-24 lg:w-28 lg:h-28 lg:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500 bg-gray-800/20 rounded-full border-2 border-white' 
                    />
                </div>
            </div>
        </div>
    )
}

{/* 
<div className='first:mt-0 mt-16 flex flex-col md:flex-row gap-8 w-full'>
    <div className='md:basis-1/2'>
        <div className='flex-grow border rounded-md px-8 py-10 flex flex-col justify-center items-start w-full h-full shadow-md shadow-slate-50'>
            <TitleBlock alignBlock={alignBlock} icon={icon} kicker={kicker} title={title} subTitle={subTitle} subTitleSize={subTitleSize} />
            <button onClick={() => openModal(videoUrl)} className='mt-8 text-md text-arnotBlue flex justify-center items-center group transition ease-in-out duration-300'>
                <div>{buttonLabel}</div>
                <RxArrowRight className='text-xl ml-2 group-hover:translate-x-1 transition ease-in-out duration-300' />
            </button>
        </div>
    </div>
    <div className='flex-shrink-0 md:basis-1/2'>
        <div className='flex-shrink border border-transparent shadow-lg shadow-slate-50'>
            <VideoFullWidth url={url} videoThumbnail={image} openModal={openModal} />
        </div>
    </div>
</div> 
*/}