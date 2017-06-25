const getDes = (arr, open) =>
    arr.map(
        item => ({
            key: item,
            select: item,
            open: open.select
        })
    );

export const group = { select: 'group' };
export const rule = { select: 'rule' };

export const [ team ] = getDes(['team-handle'], group);

export const task  = { select: 'task' };
export const [ code, alg, share ] = getDes(['code', 'alg', 'share'], task);

export const other = { select: 'other'};
export const [ noGroup, noGood, noInTeam ] = getDes(
    ['no-group', 'no-good', 'no-in-team'],
    other
);

export const own = { select: 'own' };
export const [ submit ] = getDes(['submit'], own);
