import { FiPlus, FiMinus } from "react-icons/fi";
import { BsFileEarmarkPdf, BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs"
import KneeIcon from "../../public/svg/KneeIcon.svg"
import HipIcon from "../../public/svg/HipIcon.svg"
import ShoulderIcon from "../../public/svg/ShoulderIcon.svg"
import PlayIcon from "../../public/svg/PlayIcon.svg"
import Paragraph from "./Paragraph";
import SideVideo from "./SideVideo";

export const ICONS = {
    Plus: FiPlus,
    Minus: FiMinus,
    knee: KneeIcon,
    hip: HipIcon,
    shoulder: ShoulderIcon,
    pdf: BsFileEarmarkPdf,
    play: PlayIcon,
    carouselArrowLeft: BsArrowLeftCircle,
    carouselArrowRight: BsArrowRightCircle
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