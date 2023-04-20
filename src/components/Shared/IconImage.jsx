import { ICONS } from '../Theme'
import Image from 'next/image'

export default function IconImage(props) {
    const {
        icon,
    } = props

    const src = ICONS[icon]

    return (
        <Image src={src} alt='icon' className={`w-6 h-6`} />
    )
}
