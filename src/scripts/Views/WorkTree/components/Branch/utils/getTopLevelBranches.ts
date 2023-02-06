import  { treeDBInstance, BranchRecord } from '../../../indexedDB/database';

export function getTopLevelBranches(treeId: number): Promise<BranchRecord[]> {
    return treeDBInstance.branch
        .where({treeId: treeId})
        .filter(branch => branch.parentBranchId === undefined)
        .toArray();
}
