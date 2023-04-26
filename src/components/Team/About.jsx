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
        <div className='pt-36 pb-12'>
            <h2 className='font-bold text-2xl'>About Dr. {fullName}</h2>
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
