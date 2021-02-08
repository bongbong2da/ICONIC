import React, {useEffect, useState} from 'react';
import {HeartTwoTone} from "@ant-design/icons";
import {Badge, Menu} from "antd";
import {CreatedChannelTypes, PublicChannelTypes} from "../layout/SideBar";
import {useDispatch} from "react-redux";
import {saveChannelIdx} from "../redux/reducer/channelRedux";

type ChannelItemProps = {
    publicchannellist: PublicChannelTypes[] | null;
    createdchannellist: CreatedChannelTypes[] | null;
}

const ChannelItem = (props: ChannelItemProps) => {

    const [publicList, setPublicList] = useState([] as PublicChannelTypes[] | null);
    const [createdList, setCreatedList] = useState([] as CreatedChannelTypes[] | null);
    const dispatcher = useDispatch();


    useEffect(() => {
        if (props.publicchannellist) setPublicList(props.publicchannellist);
        if (props.createdchannellist) setCreatedList(props.createdchannellist);
    });

    const handleClick = (idx : number) => {
        const target = document.getElementById("display-channel");

        console.log(`Channel to ${idx}`);

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
            {publicList ? publicList.map((data, index) => {
                console.log("Rendering public list ======================");
                console.log(data);
                return (
                    <Menu.Item
                        key={data.pchanIdx}
                        className={"custom-menu-item"}
                        icon={<HeartTwoTone twoToneColor="#eb2f96"/>}
                        {...props}
                        onClick={()=>handleClick(data.pchanIdx)}
                    >
                        <Badge
                            className="badge-example"
                            count={1}
                            style={{backgroundColor: "gray"}}
                        />
                        {data.pchanName}
                    </Menu.Item>
                )
            }) : channelEmpty}
            {createdList ? createdList.map((data, index) => {
                console.log("Rendering created list ======================");
                console.log(data);
                return (
                    <Menu.Item
                        key={data.cchanIdx}
                        className={"custom-menu-item"}
                        icon={<HeartTwoTone twoToneColor="#eb2f96"/>}
                        {...props}
                        onClick={()=>handleClick(data.cchanIdx)}
                    >
                        <Badge
                            className="badge-example"
                            count={1}
                            style={{backgroundColor: "gray"}}
                        />
                        {data.cchanName}
                    </Menu.Item>
                )
            }) : channelEmpty}
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

    )
}

export default ChannelItem;