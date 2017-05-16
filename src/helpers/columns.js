export const getColumns = columns => {
    columns.push({ handle: '操作' });
    return columns.map(column => {
        const { 0: key } = Object.keys(column);
        return {
            title: column[key],
            dataIndex: key,
            key
        };
    });
};
