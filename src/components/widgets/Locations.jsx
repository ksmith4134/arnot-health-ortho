import { useEffect, useState } from 'react'
import { AiFillPhone } from 'react-icons/ai'
import { FaStethoscope, FaWalking } from 'react-icons/fa'

export default function Locations(props) {

    const {
        locations,
        showContact = true,
        showFilters = true,
    } = props

    // Data Structure: locations
    // id, city, state, url, image, name, street, zip, services: ['physicians', 'therapy']

    const [ physicians, setPhysicians ] = useState(true)
    const [ therapy, setTherapy ] = useState(false)
    const [ locationFilter, setLocationFilter ] = useState('physicians')
    const [ address, setAddress ] = useState(
        encodeURIComponent(locations[0].street+', '+locations[0].city+', '+locations[0].state+' '+locations[0].zip)
    )

    const handleLocationFilter = (e) => {

        setPhysicians(!physicians);
        setTherapy(!therapy);
        setAddress(null)

        e.target.name === 'physicians' ? setLocationFilter('physicians') : setLocationFilter('therapy')
    }

    return (
        <div id='locations'>
            <div className='flex flex-col md:flex-row'>
                <div className='md:basis-1/3 md:mr-8 lg:mr-16'>
                    <h2 className='mt-2 font-bold text-2xl'>Locations</h2>
                    <p className='mt-4 text-sm'>Click the buttons below to update the map to your location. Feel free to call with any questions.</p>
                    { showContact && 
                        <div className='inline-flex items-center mt-4'>
                            <AiFillPhone className='text-lg' />
                            <p className='ml-2 text-sm'>(607) 734-4110</p>
                        </div>
                    }
                    { showFilters && 
                        <form className='mt-8'>
                            <div className='mt-4 flex justify-between items-center'>
                                <div className='inline-flex gap-2'>
                                    <FaStethoscope className='text-arnotBlue text-lg' />
                                    <p className='text-sm'>Physicians</p>
                                </div>
                                <input 
                                    type='checkbox' 
                                    name='physicians'
                                    checked={physicians}
                                    onChange={(e) => handleLocationFilter(e)}
                                    className='w-4 h-4 accent-gray-800'
                                ></input>
                            </div>
                            <div className='mt-4 flex justify-between items-center'>
                                <div className='inline-flex gap-2'>
                                    <FaWalking className='text-arnotBlue text-lg' />
                                    <p className='text-sm'>Physical Therapy</p>
                                </div>
                                <input 
                                    type='checkbox' 
                                    name='therapy'
                                    checked={therapy}
                                    onChange={(e) => handleLocationFilter(e)}
                                    className='w-4 h-4 accent-gray-800'
                                ></input>
                            </div>
                        </form>
                    }
                    <div className='flex flex-col mt-6'>
                        { locations
                            .filter(item => item.services.includes(locationFilter))
                            .map(item => (
                                <div 
                                    key={item.id} 
                                    className={`
                                        my-2 border px-6 py-3 rounded-md text-sm font-semibold hover:cursor-pointer 
                                        ${encodeURIComponent(item.street+', '+item.city+', '+item.state+' '+item.zip) === address 
                                            ? 'text-white border-arnotBlue/20 bg-arnotBlue'
                                            : 'hover:bg-arnotBlue/10 hover:border-arnotBlue/10 bg-slate-50/50'
                                        }
                                    `} 
                                    onClick={() => setAddress(encodeURIComponent(item.street+', '+item.city+', '+item.state+' '+item.zip))}
                                >
                                    { item.name }
                                </div>
                            ))
                        }
                    </div>
                </div>
                { address ?
                    <iframe
                        className='w-full min-h-[400px] mt-6 md:mt-0'
                        style={{ border:0, borderRadius: '6px' }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCPG25zMmuENCmcK8x8oe7fJNs6TjVvahY&q=${address}&zoom=16`}
                    ></iframe>
                    :
                    <div className='w-full min-h-[400px] mt-6 md:mt-0 bg-slate-100 rounded-md flex justify-center items-center'>Select a location to view map</div>
                }
            </div>
        </div>
    )
}