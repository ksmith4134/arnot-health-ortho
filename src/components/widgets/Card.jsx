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
        <div className='w-full flex flex-col md:flex-row min-h-[600px]'>
            <div className='order-1 basis-1/2 bg-slate-100'>

            </div>
            <div className='order-2 basis-1/2 bg-slate-50 flex flex-col justify-center items-start px-12 py-16'>
                <div className='max-w-lg'>
                    <h3 className='font-bold'>{kicker.toUpperCase()}</h3>
                    <h2 className='text-4xl mt-8 font-light'>{title}</h2>
                    <p className='mt-8'>{description}</p>
                    <div className='mt-12 flex'>
                        <div className='mr-8 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                        <div className='mr-8 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                        <div className='mr-8 last:mr-0 w-28 h-28 bg-slate-200 rounded-md'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
