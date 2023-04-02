import Image from "next/image"

export default function ProfilePic(props) {
    const {
        url
    } = props

    return (
        <div className='w-24 h-24 rounded-full bg-arnotBlue/50 relative overflow-hidden'>
            <Image src={url} alt="profile picture" fill quality={100} priority className='object-cover' />
        </div>
    )
}
