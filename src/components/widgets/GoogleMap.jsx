import Image from 'next/image'
import Link from 'next/link'
import { RxArrowRight } from 'react-icons/rx'
import { useState } from 'react'

export default function GoogleMap(props) {

    const {
        locations,
    } = props

    // id, city, state, url, image, name, street, zip
    const [ map, setMap ] = useState(locations[0].name)


    return (
        <div className='pt-24 pb-12' id='locations'>
            <h2 className='font-bold text-2xl'>Locations</h2>
            <div className='flex flex-row flex-wrap justify-start items-center mt-6'>
                    { locations.map(item => (
                        <div key={item.id} className={`mr-4 my-2 border px-6 py-3 rounded-md font-semibold hover:cursor-pointer ${item.name === map ? 'text-arnotBlue border-arnotBlue bg-arnotBlue/10' : 'hover:border-arnotBlue bg-gray-50'}`} onClick={() => setMap(item.name)}>
                            { item.name }
                        </div>
                    ))}
                </div>
            <iframe
                className='w-full aspect-video mt-6'
                style={{ border:0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCPG25zMmuENCmcK8x8oe7fJNs6TjVvahY&q=${map}&zoom=18`}
            >
            </iframe>
        </div>
    )
}