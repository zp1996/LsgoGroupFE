import React from 'react';
import { connect } from 'react-redux';
import Rule from 'Components/Rule';
import { rule } from 'Constants/menu';
import Layout from './layout';

const rules = [{
    title: '团队成员必须遵守的三项制度：',
    key: 'must',
    list: [
        '“知识分享制度”，即团队成员需要每月在团队微信公众平台分享一篇稿高质量图文',
        '“成长总结制度”，即团队成员需要每月对自己的得与失进行反思与总结',
        '“轮流汇报制度”，即以小组为单位汇报本周的学习成果，相互促进集体学习'
    ]
}, {
    title: '团队成员自愿遵守的三项制度：',
    key: 'auto',
    list: [
        '每人每学期提交一个高质量的产品级程序，具体应用场景不限',
        '参与维护团队微信公众平台，每周帮忙搜集至少一篇娱乐性质的优质IT文章',
        '参与团队重要项目的开发'
    ]
}];

class RulePage extends Layout {
    constructor(props) {
        super(props);
    }
    render() {
        return this.layout(
            <Rule rules={rules} />, { select: rule }
        );
    }
}
// 防止切换页面时产生不必要re-render
export default connect(
    state => ({
        team: state.team
    })
)(RulePage);
