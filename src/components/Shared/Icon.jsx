import { ICONS } from '../Theme'

export default function Icon(props) {
    const {
        icon,
        color,
        size = 'text-2xl'
    } = props

    const RenderIcon = ICONS[icon]

    return (
        <div className={`${size} ${color}`}>
            <RenderIcon />
        </div>
    )
}
