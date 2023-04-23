import Video from "../Video"

export default function About(props) {

    const { 
        fullName, 
        biography, 
        url, 
        videoThumbnail, 
        openModal,
    } = props

    return (
        <div className='max-w-5xl px-8 mx-auto pt-36 pb-24'>
            <h2 className='font-bold text-xl'>About {fullName}</h2>
            <div className='mt-4'>
                <Video 
                    description={biography} 
                    videoUrl={url} 
                    image={videoThumbnail} 
                    handleClick={openModal} 
                    verticalAlign={'start'}
                />
            </div>
        </div>
    )
}
