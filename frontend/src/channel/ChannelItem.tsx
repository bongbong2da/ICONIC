import React from 'react';
import {HeartTwoTone} from "@ant-design/icons";
import {Badge} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";

const ChannelItem = () => {

    return (
        <MenuItem key={2} icon={<HeartTwoTone twoToneColor="#eb2f96" />}>
            <Badge
                className="badge-example"
                count={1}
                style={{backgroundColor: "gray"}}
            />
            Joined Channel 1 (Example)
        </MenuItem>
    )
}

export default ChannelItem;