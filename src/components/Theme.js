import { FiPlus, FiMinus } from "react-icons/fi";
import KneeIcon from "../../public/svg/KneeIcon.svg"
import HipIcon from "../../public/svg/HipIcon.svg"
import ShoulderIcon from "../../public/svg/ShoulderIcon.svg"
import Paragraph from "./Paragraph";
import SideVideo from "./SideVideo";

export const ICONS = {
    Plus: FiPlus,
    Minus: FiMinus,
    knee: KneeIcon,
    hip: HipIcon,
    shoulder: ShoulderIcon
};

export const COMPONENTS = {
    Paragraph: Paragraph,
    SideVideo: SideVideo
}

export const FONT_COLORS = {
    primary: 'text-arnotBlue',
    secondary: 'text-teal-500',
}

export const HOVER_FONT_COLORS = {
    primary: 'hover:text-arnotBlue',
    secondary: 'hover:text-teal-500',
}
