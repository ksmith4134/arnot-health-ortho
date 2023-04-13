import React from 'react'

export default function VideoModal(props) {

    const { url, handleClick } = props;

    return (
        <div className='fixed w-full h-full top-0 z-30' onClick={handleClick}>
            <div className='relative w-full h-full'>
                <div className='absolute bg-gray-900 opacity-80 w-full h-full'>
                </div>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center z-20'>
                    <iframe width='700' height='393.7' src={`${url}?autoplay=1`} allow='autoplay' allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}
