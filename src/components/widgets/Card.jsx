import React from 'react'

export default function Card(props) {

    const {
        kicker = '',
        title = '',
        description = '',
        logos = [],
        videoUrl = '',
        videoThumbnail = '',
        openModal,
    } = props

    return (
        <div className='w-full flex flex-col md:flex-row'>
            <div className='order-1 basis-1/2 bg-slate-100 h-96'>

            </div>
            <div className='order-2 basis-1/2 bg-slate-50 flex flex-col justify-center items-start px-12 py-16'>
                <div className='max-w-lg'>
                    <h3 className='font-bold'>{kicker.toUpperCase()}</h3>
                    <h2 className='text-4xl mt-4 font-light'>{title}</h2>
                    <p className='mt-4'>{description}</p>
                </div>
            </div>
        </div>
    )
}
