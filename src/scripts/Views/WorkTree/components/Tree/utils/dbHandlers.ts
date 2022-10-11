import  { treeDBInstance, BranchRecord } from '../../../indexedDB/database';

export function addTree(name: string): Promise<number> {
    return treeDBInstance.transaction('rw', treeDBInstance.tree, async () => {
        return treeDBInstance.tree.put({name: name});
    });
}

export function removeTreeWithBranches(id: number) {
    treeDBInstance.branch.where('treeId').equals(id).delete();
    treeDBInstance.tree.delete(id);
}

export function getTopLevelBranches(treeId: number): Promise<BranchRecord[]> {
    return treeDBInstance.branch
        .where({treeId: treeId})
        .filter(branch => branch.parentBranchId === undefined)
        .toArray();
}
