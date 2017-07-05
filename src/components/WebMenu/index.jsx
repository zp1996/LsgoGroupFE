import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import {
    task, code, alg, share, own, submit, groupTask,
    team, other, noGroup, noGood, noInTeam, rule
} from 'Constants/menu';

const { Item, ItemGroup, SubMenu } = Menu;

const SubMenuTitle = (icon, title) => (
    <span>
        <Icon type={icon} />
        <span>{ title }</span>
    </span>
);

const getOther = {
    admin: () => (
        <SubMenu key="group" title={SubMenuTitle("code-o", "实验室管理")}>
            <Item {...team}>
                <Link to="/team">小组管理</Link>
            </Item>
            <Item>图文申请</Item>
            <Item {...groupTask}>
                <Link to="/group-task">小组任务</Link>
            </Item>
        </SubMenu>
    ),
    grouper: () => (
        <SubMenu key="group" title={SubMenuTitle("code-o", "小组管理")}>
            <Item>分配任务</Item>
        </SubMenu>
    ),
    member: () => null
};

const WebMenu = ({ select, open, groups }) => {
    return (
        <Menu style={{ width: 240 }} mode="inline"
            defaultSelectedKeys={[select]}
            defaultOpenKeys={['task', open]}
        >
            <SubMenu key="member" title={SubMenuTitle("team", "实验室人员")}>
                <ItemGroup key="group" title="各小组成员">
                    {
                        groups && groups.map(group => (
                            <Item key={group.id}>{group.name}</Item>
                        ))
                    }
                </ItemGroup>
                <ItemGroup key={other.select} title="未分组成员 && 未达标成员">
                    <Item {...noGroup}>未分组成员</Item>
                    <Item {...noGood}>未达标成员</Item>
                    <Item {...noInTeam}>被淘汰成员</Item>
                </ItemGroup>
            </SubMenu>
            <SubMenu key={task.select} title={SubMenuTitle("schedule", "实验室任务")}>
                <Item key={code.key}>代码/工程</Item>
                <Item key={alg.key}>算法</Item>
                <Item key={share.key}>本周分享</Item>
            </SubMenu>
            {
                getOther['admin']()
            }
            <SubMenu key={own.select} title={SubMenuTitle("book", "月总结")}>
                <Item key={submit.key}>
                    <Link to="/submit">提交月总结</Link>
                </Item>
                <Item>图文投稿</Item>
                <Item>团队成员月总结</Item>
            </SubMenu>
            <Item key={rule.select}>
                <Link to="/rule">
                    <Icon type="solution" />
                    <span>团队制度</span>
                </Link>
            </Item>
        </Menu>
    );
};

export default WebMenu;
