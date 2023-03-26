import { useState } from "react"
import { getStoryblokApi } from "@storyblok/react"
import Indexes from "@/components/Indexes"
import ConditionHeader from "@/components/ConditionHeader"
import VideoModal from "@/components/VideoModal"
import { COMPONENTS } from "@/components/Theme"

export default function Condition(props) {

    const { condition, params, indexes, conditionHeader, page = null } = props

    // console.log('API Response', condition)

    const [ index, setIndex ] = useState('Background')
    const [ videoModal, setVideoModal ] = useState(null)

    const handleClick = (id) => {
        setIndex(id)
    }

    // open full screen video modal
    const openModal = (url) => {
        console.log('Open modal click', url)
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
            return (<div>Component was not found</div>)
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
        <div className="relative">
            <div className="max-w-4xl min-h-screen my-16 mx-auto flex flex-row space-x-4 items-start px-8">
                <div className="basis-1/5 sticky top-8">
                    <Indexes indexes={indexes} selected={index} handleClick={handleClick} />
                </div>
                <div className="basis-4/5">
                    <ConditionHeader bodyPart={params.body} label={index} title={conditionHeader.title} description={conditionHeader.description} />
                    {
                        layout.find(item => item.index === index).components.map((component, index) => (
                            <div key={index} className="mt-12 flex flex-col">{component}</div>
                        ))
                    }
                </div>
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
                            media: j.media, // needs update to handle array of images
                            text: j.text.content[0].content[0].text
                        }
                    case 'SideVideo': 
                        return {
                            component: 'SideVideo',
                            asset: j.asset[0] ? {
                                type: j.asset[0].component,
                                icon: j.asset[0].icon,
                                url: j.asset[0].url, // fix this, go to Asset type, not url string
                                title: j.asset[0].title,
                            } : null,
                            title: j.title,
                            description: j.description.content[0].content[0].text,
                            videoUrl: j.videoUrl.url,
                            image: j.media ? j.media.filename : null
                        }
                    default:
                        return []
                        break;
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