import { useState } from 'react'
import { AiFillPhone } from 'react-icons/ai'

export default function GoogleMapDuex(props) {

    const {
        locations,
    } = props

    // id, city, state, url, image, name, street, zip
    const [ map, setMap ] = useState(locations[0].name)



    return (
        <div id='locations'>
            <div className='flex flex-col md:flex-row md:items-start'>
                <div className='md:basis-1/3 md:mr-8 lg:mr-16'>
                    <h2 className='mt-2 font-bold text-2xl'>Locations</h2>
                    <p className='mt-4 text-sm'>Click the buttons below to update the map to your location. Feel free to call with any questions.</p>
                    <div className='inline-flex items-center mt-4'>
                        <AiFillPhone className='text-lg' />
                        <p className='ml-2 text-sm'>(607) 734-4110</p>
                    </div>
                    <div className='flex flex-col mt-6'>
                        { locations.map(item => (
                            <div key={item.id} className={`my-2 border px-6 py-3 rounded-md text-sm font-semibold hover:cursor-pointer ${item.name === map ? 'text-arnotBlue border-arnotBlue bg-arnotBlue/10' : 'hover:bg-arnotBlue/10 hover:border-arnotBlue/10 bg-gray-50'}`} onClick={() => setMap(item.name)}>
                                { item.city }
                            </div>
                        ))}
                    </div>
                </div>
                <iframe
                    className='w-full h-full min-h-[400px] mt-6 md:mt-0'
                    style={{ border:0, borderRadius: '6px' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCPG25zMmuENCmcK8x8oe7fJNs6TjVvahY&q=${map}&zoom=13`}
                ></iframe>
            </div>
            
            
        </div>
    )
}