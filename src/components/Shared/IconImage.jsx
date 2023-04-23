import { ICONS, BODY_ICONS } from '../Theme'
import Image from 'next/image'

export default function IconImage(props) {
    const {
        icon,
        type = '',
        size = 'w-6 h-6'
    } = props

    const src = type === 'body' ? BODY_ICONS[icon] : ICONS[icon]

    return (
        <Image src={src} alt='icon' className={`${size}`} />
    )
}
