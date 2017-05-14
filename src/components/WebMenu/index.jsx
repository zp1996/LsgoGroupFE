import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const { Item, ItemGroup, SubMenu } = Menu;

const SubMenuTitle = (icon, title) => (
    <span>
        <Icon type={icon} />
        <span>{ title }</span>
    </span>
);

const getOther = {
    admin: () => (
        <SubMenu key="team" title={SubMenuTitle("team", "实验室管理")}>
            <Item>小组管理</Item>
            <Item>小组任务</Item>
        </SubMenu>
    ),
    grouper: () => (
        <SubMenu key="group" title={SubMenuTitle("team", "小组管理")}>
            <Item>分配任务</Item>
        </SubMenu>
    ),
    member: () => null
};

const WebMenu = () => {
    return (
        <Menu style={{ width: 240 }} mode="inline">
            <SubMenu key="member" title={SubMenuTitle("team", "实验室人员")}>
                <ItemGroup key="group" title="各小组成员">
                    <Item key="web">Web 小组</Item>
                    <Item key="C#">C# 小组</Item>
                    <Item key="mat">Matlab 小组</Item>
                </ItemGroup>
                <ItemGroup key="other" title="未分组成员 && 未达标成员">
                    <Item key="no-group">未分组成员</Item>
                    <Item key="no-good">未达标成员</Item>
                </ItemGroup>
            </SubMenu>
            <SubMenu key="task" title={SubMenuTitle("schedule", "实验室任务")}>
                <Item key="code">代码/工程</Item>
                <Item key="alg">算法</Item>
                <Item key="share">每周分享资料</Item>
            </SubMenu>
            {
                getOther['grouper']()
            }
            <SubMenu key="own" title={SubMenuTitle("user", "月总结")}>
                <Item>提交月总结</Item>
                <Item>团队成员月总结</Item>
            </SubMenu>
        </Menu>
    );
};

export default WebMenu;
