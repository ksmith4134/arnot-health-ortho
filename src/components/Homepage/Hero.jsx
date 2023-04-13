import Image from 'next/image'
import ButtonPrimary from '../Shared/ButtonPrimary'
import CarouselWrapper from '../CarouselWrapper'

export default function Hero(props) {
    
    const {
        kicker = [
            {id: 0, label: 'Joint surgery'}, 
            {id: 1, label: 'Sports medicine'}, 
            {id: 2, label: 'Physical therapy'}
        ],
        title = 'Arnot Health Orthopedics',
        subTitle = 'Our archive of resources will help guide you through your treament. Find everything from preventative care videos to pre- and post-operative educational content.',
        buttonLabel = 'Find My Condition',
        image = '/HeroTest.jpg',
        media = [],
        carousel= false,
        url = '#body-diagram'
    } = props

    return (
        <div className='relative overflow-hidden w-full h-[600px] bg-gray-200 shadow-lg shadow-slate-400/10'>
            
            {/* Image */}
            <div className='absolute right-0 w-3/4 h-full z-0 opacity-50 md:opacity-100'>
                { media.length > 0
                    ? <CarouselWrapper media={media} hero={carousel} />
                    : <Image src={image} alt="hero image" fill quality={100} priority className='object-cover' />
                }
                
            </div>

            {/* White Gradient */}
            <div className='absolute left-0 top-0 w-3/4 h-full z-10 bg-gradient-to-r from-white via-white ...'></div>

            {/* Text and Button */}
            <div className='max-w-5xl h-full mx-auto px-8 flex justify-center md:justify-start items-center'>
                <div className='max-w-lg z-20'>
                    { kicker &&  
                        <div className='flex flex-row space-x-4'>
                            {
                                kicker.map((item) => (
                                    <h4 key={item.id} className='uppercase text-xs last:border-r-0 border-r-[1px] border-gray-400 h-7 flex items-center pr-4'>{item.label}</h4>
                                ))
                            }
                        </div>
                    }
                    <h1 className='mt-6 text-4xl font-bold'>{title}</h1>
                    <p className='mt-6 font-light text-md'>{subTitle}</p>
                    <div className='mt-10'>
                        <ButtonPrimary label={buttonLabel} url={url} />
                    </div>
                </div>
            </div>

        </div>
    )
}