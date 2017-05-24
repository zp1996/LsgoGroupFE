const getDes = (arr, open) =>
    arr.map(
        item => ({
            key: item,
            select: item,
            open
        })
    );

export const group = 'group';
export const rule = 'rule';

export const team = 'team';
export const [ teamHandle ] = getDes(['team-handle'], team);

export const task  = 'task';
export const [ code, alg, share ] = getDes(['code', 'alg', 'share'], task);

export const other = 'other';
export const [ noGroup, noGood, noInTeam ] = getDes(
    ['no-group', 'no-good', 'no-in-team'],
    other
);

export const own = 'own';
export const [ submit ] = getDes(['submit'], own);
