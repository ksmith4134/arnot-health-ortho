import Image from 'next/image'
import { ICONS } from '../Theme'
import { RxArrowRight } from 'react-icons/rx'
import TitleBlock from '../Shared/TitleBlock'
import ButtonPrimary from '../Shared/ButtonPrimary'

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
                {/* TITLE CARD */}
                <div className='border rounded-md px-10 py-16 shadow-md shadow-slate-50'>
                    <TitleBlock alignBlock={'left'} icon={icon} kicker={kicker} title={title} subTitle={description} />
                    <button onClick={() => handleClick(videoUrl)} className='mt-12 text-md text-arnotBlue flex justify-center items-center group transition ease-in-out duration-300'>
                        <div>Watch Video</div>
                        <RxArrowRight className='text-xl ml-2 group-hover:translate-x-1 transition ease-in-out duration-300' />
                    </button>
                </div>
                {/* VIDEO CARD */}
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
            </div>
            {/* LOGOS CARD */}
            { logos.length > 1 && 
                <div className='mt-8 p-8 border rounded-md flex gap-16 justify-center flex-wrap mx-auto shadow-md shadow-slate-50'>
                    { logos.map((img, index) => (
                        <div key={index} className='relative w-28 h-28 opacity-50 grayscale'>
                            <Image alt={'team logo'} src={img} fill={true} className='object-contain' />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
