import React from 'react';
import styles from './index.less';

const WebTextArea = ({ title, value, place, change }) => (
    <div>
        <h6>{ title }</h6>
        <textarea placeholder={place || '暂无'} onChange={change}
            className="web-textarea" value={value}>
        </textarea>
    </div>
);

export default WebTextArea;
