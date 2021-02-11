import React, {useEffect, useState} from 'react';
import {Badge, Menu} from "antd";
import {ChannelTypes} from "../layout/SideBar";
import {useDispatch} from "react-redux";
import {saveChannelIdx} from "../../redux/reducer/channelRedux";

type ChannelItemProps = {
    channel_list: ChannelTypes[] | null;
}

const ChannelItem = (props: ChannelItemProps) => {

    const [channelList, setChannelList] = useState([] as ChannelTypes[] | null);
    const dispatcher = useDispatch();


    useEffect(() => {
        if (props.channel_list) setChannelList(props.channel_list);
    });

    const handleClick = (idx : number) => {
        const target = document.getElementById("display-channel");

        // console.log(`Channel to ${idx}`);

        // ReactDOM.render(
        //     <Channel channel_idx={idx}/>,
        //     target
        // )

        dispatcher(saveChannelIdx(idx));
    }

    const channelEmpty = (
        <div>
            No Postings Here.
        </div>
    )

    return (
        <>
            {channelList ? channelList.map((data, index) => {
                // console.log("Rendering public list ======================");
                // console.log(data);
                return (
                    <Menu.Item
                        key={data.chanIdx}
                        className={"custom-menu-item"}
                        icon={data.chanEmoji}
                        onClick={()=>handleClick(data.chanIdx)}
                        {...props}
                    >

                        {data.chanName + " "}
                        <Badge
                            className="badge-example"
                            count={1}
                            style={{backgroundColor: "red"}}
                        />
                    </Menu.Item>
                )
            }) : channelEmpty}
            {/*{createdList ? createdList.map((data, index) => {*/}
            {/*    console.log("Rendering created list ======================");*/}
            {/*    console.log(data);*/}
            {/*    return (*/}
            {/*        <Menu.Item*/}
            {/*            key={data.cchanIdx}*/}
            {/*            className={"custom-menu-item"}*/}
            {/*            icon={<HeartTwoTone twoToneColor="#eb2f96"/>}*/}
            {/*            {...props}*/}
            {/*            onClick={()=>handleClick(data.cchanIdx)}*/}
            {/*        >*/}
            {/*            <Badge*/}
            {/*                className="badge-example"*/}
            {/*                count={1}*/}
            {/*                style={{backgroundColor: "gray"}}*/}
            {/*            />*/}
            {/*            {data.cchanName}*/}
            {/*        </Menu.Item>*/}
            {/*    )*/}
            {/*}) : channelEmpty}*/}
            {/*<Menu.Item*/}
            {/*    className={"custom-menu-item"}*/}
            {/*    icon={<HeartTwoTone twoToneColor="#eb2f96" />}*/}
            {/*    {...props}*/}
            {/*>*/}
            {/*    <Badge*/}
            {/*        className="badge-example"*/}
            {/*        count={1}*/}
            {/*        style={{backgroundColor: "gray"}}*/}
            {/*    />*/}
            {/*    Joined Channel 1 (Example)*/}
            {/*</Menu.Item>*/}
        </>

    );
}

export default ChannelItem;