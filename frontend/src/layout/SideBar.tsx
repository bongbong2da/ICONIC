import React, {useEffect, useState} from 'react';
import {Badge, Layout, Menu} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {CheckCircleTwoTone, DesktopOutlined, HeartTwoTone} from "@ant-design/icons";
import {SmileTwoTone} from "@ant-design/icons/";

export const SideBar = () => {

    const Sider = Layout.Sider;

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {

    }, [collapsed]);

    const onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    }

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
            backgroundColor: "#264653"
        }}
        >

            {/*DB정보를 받아와 채널 목록을 Iterate하여 출력함.*/}

            <Menu defaultSelectedKeys={['1']}>
                <MenuItem key={1} icon={<SmileTwoTone/>}>
                    <Badge
                        className="badge-example"
                        count={23}
                        style={{backgroundColor: "red"}}
                    />
                    Joined Channel 1 (Example)
                </MenuItem>
                <MenuItem key={2} icon={<HeartTwoTone twoToneColor="#eb2f96" />}>
                    <Badge
                        className="badge-example"
                        count={1}
                        style={{backgroundColor: "gray"}}
                    />
                    Joined Channel 1 (Example)
                </MenuItem>
                <MenuItem key={3} icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
                    <Badge
                        className="badge-example"
                        count={10}
                        style={{backgroundColor: "green"}}
                    />
                    Joined Channel 1 (Example)
                </MenuItem>
            </Menu>
        </Sider>
    )
}