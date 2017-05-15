import React from 'react';
import styles from './index.less';

const getRule = ({ title, list, key }) => (
    <div key={key} className="rule-unique">
        <h5>{ title }</h5>
        <ul className="rule-list">
            {
                list.map((item, key) => (
                    <li key={key}>{ item }</li>
                ))
            }
        </ul>
    </div>
);

const Rule = ({ rules }) => {
    return (
        <div className="rule">
            <h1 className="rule-title">LsgoGroup团队规章制度</h1>
            {
                rules.map((item, key) => {
                    item.key = item.key || key;
                    return getRule(item);
                })
            }
        </div>
    );
};

export default Rule;
