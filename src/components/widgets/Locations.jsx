import Image from 'next/image'
import Link from 'next/link'
import { RxArrowRight } from 'react-icons/rx'


export default function LocationsWrapper(props) {

    const {
        locations,
    } = props

    // id, city, state, url, image, name, street, zip
    
    // const evenNumber = locations.length % 2 === 0 ? true : false

    return (
        <div className='max-w-5xl px-8 mx-auto pt-24 pb-12'>
            <h2 className='font-bold text-2xl'>Locations</h2>
            <div className={`mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12`}>
                { locations.map(item => (
                    <div key={item.id} className='w-full relative flex flex-row items-center overflow-hidden border h-40 md:h-48 shadow-lg shadow-gray-300/20'>
                        <Image 
                            src={item.image} alt='map'
                            width={400} height={225}
                            className='object-cover w-40 md:w-48 h-full' 
                        />
                        <div className='px-8 py-12'>
                            <p className='font-bold'>{item.name}</p>
                            <p className='mt-4 text-sm'>{item.street}</p>
                            <p className='mb-4 text-sm'>{item.city}, {item.state} {item.zip}</p>
                            <Link href={item.url} className='text-arnotBlue text-sm group flex items-center'>
                                <div>Google Maps</div>
                                <RxArrowRight className={`
                                    text-arnotBlue
                                        text-lg ml-2 
                                        group-hover:translate-x-1 transition ease-in-out duration-300
                                `} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* 
<div className={`mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12`}>
    { locations.map(item => (
        <div key={item.id} className='w-full relative flex flex-col overflow-hidden group rounded-md border hover:shadow-lg hover:shadow-gray-300/20'>
            <Image 
                src={item.image} alt='map'
                width={800} height={450}
                className='object-cover rounded-t-md aspect-video' 
            />
            <div className='px-8 py-12'>
                <p className='font-bold'>{item.name}</p>
                <p className='mt-4'>{item.street}</p>
                <p className='mb-4'>{item.city}, {item.state} {item.zip}</p>
                <Link href={item.url} className='text-arnotBlue underline underline-offset-4'>Google Maps</Link>
            </div>
        </div>
    ))}
</div> 
*/
