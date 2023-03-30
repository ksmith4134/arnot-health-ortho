import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getStoryblokApi, renderRichText } from "@storyblok/react"
import IndexesDesktop from "@/components/IndexesDesktop"
import IndexesMobile from "@/components/IndexesMobile"
import ConditionHeader from "@/components/ConditionHeader"
import VideoModal from "@/components/VideoModal"
import { COMPONENTS } from "@/components/Theme"
import LoadingSpinner from "@/components/LoadingSpinner"
import { render } from "react-dom"

export default function Condition(props) {

    const { condition, params, indexes, conditionHeader, page = null } = props

    // console.log('API Response', condition)
    // console.log('Normalized Response', page)

    const router = useRouter()

    const [ index, setIndex ] = useState(null)
    const [ openDropdown, setOpenDropdown ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ videoModal, setVideoModal ] = useState(null)

    useEffect(() => {
        router.isReady && setIndex(router.query.index)
    }, [router])

    useEffect(() => {
        setLoading(false)
    }, [index])

    const handleIndexClick = (index) => {
        setOpenDropdown(false)
        router.push(`/${params.body}/${params.condition}?index=${index}`)
    }

    const openDropdownClick = () => {
        setOpenDropdown(!openDropdown)
    }

    // open full screen video modal
    const openModal = (url) => {
        setVideoModal(url)
    }

    const closeModal = () => {
        setVideoModal(null)
    }

    const getComponent = (item) => {
        if(typeof COMPONENTS[item.component] !== 'undefined') {
            const Component = COMPONENTS[item.component]
            if(item.component === 'SideVideo'){ 
                return <Component {...item} handleClick={openModal} />
            } else {
                return <Component {...item} />
            }
        } else {
            return (<div></div>)
        }
    }

    const layout = page.map((item) => {
        return {
            index: item.index,
            components: item.content.map((comp) => {
                return getComponent(comp)
            })
        }
    })

    return (
        <div className="relative z-0">
            <div className="block md:hidden sticky top-0 z-10">
                <IndexesMobile indexes={indexes} selected={index} title={conditionHeader.title} selectIndex={handleIndexClick} openDropdownClick={openDropdownClick} opened={openDropdown} />
            </div>
            <div className="max-w-4xl min-h-screen my-16 mx-auto flex flex-row md:space-x-8 items-start px-8">
                <div className="hidden md:block md:basis-1/5 sticky top-8">
                    <IndexesDesktop indexes={indexes} selected={index} selectIndex={handleIndexClick} />
                </div>
                {
                    loading 
                    ?   <div className="mt-1 w-full flex justify-center">
                            <LoadingSpinner />
                        </div> 
                    :   <div className="md:basis-4/5">
                            <ConditionHeader bodyPart={params.body} label={index} title={conditionHeader.title} description={conditionHeader.description} />
                            {
                                index && 
                                layout.find(item => item.index === index).components.map((component, index) => (
                                    <div key={index} className="mt-16 flex flex-col">{component}</div>
                                ))
                            }
                        </div>
                }
            </div>
            {videoModal && <VideoModal url={videoModal} handleClick={closeModal} />}
        </div>
    )
}


export async function getStaticPaths() {
    
    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: "draft",
        starts_with: "body",
        resolve_relations: "body.conditions",
    });

    let paths = data.stories.map((body) => 
        body.content.conditions.map((condition) => ({
            params: {
                body: body.slug,
                condition: condition.slug
            }
        }))
    ).flat()

    return {
      paths,
      fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context

    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories/conditions/${params.condition}`, {
        version: "draft",
    });

    let condition = data.story.content

    let indexes = condition.indexes.map((item) => {
        return {
            id: item._uid,
            label: item.component
        }
    })

    let conditionHeader = {
        title: condition.title,
        description: condition.shortDescription
    }

    let page = condition.indexes.map((item) => {
        return {
            index: item.component,
            content: item.page.map((j) => {
                switch (j.component) {
                    case 'Paragraph':
                        return {
                            component: 'Paragraph',
                            media: j.media[0] ? j.media.map(img => img.filename) : null,
                            richText: renderRichText(j.text)
                        }
                    case 'DropdownCard': 
                        return {
                            component: 'DropdownCard',
                            defaultOpen: j.defaultOpen,
                            title: j.title,
                            richText: renderRichText(j.contents)
                        }
                    case 'SideVideo': 
                        return {
                            component: 'Video',
                            orientation: 'row', // row, col
                            asset: j.asset[0] ? {
                                type: j.asset[0].component,
                                icon: j.asset[0].icon,
                                url: j.asset[0].url, // Fix: switch field to hosted asset, not url string
                                title: j.asset[0].title,
                            } : null,
                            title: j.title,
                            description: j.description.content[0].content[0].text,
                            videoUrl: j.videoUrl.url,
                            image: j.media ? j.media.filename : null
                        }
                    default:
                        return [];
                }
            })
        }
    })

    return {
        props: {
            condition,
            params,
            indexes,
            conditionHeader,
            page
        }
    }
}