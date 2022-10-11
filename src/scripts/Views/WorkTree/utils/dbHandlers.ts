import { treeDBInstance, TreeRecord, BranchRecord, TaskStatus } from '../indexedDB/database';

export function getTree(id: number): Promise<TreeRecord | undefined> {
    return treeDBInstance.tree.get(id);
}

export function getTrees(): Promise<TreeRecord[]> {
    return treeDBInstance.tree.toArray();
}

export function addBranch(description: string, treeId: number, parentBranchId?: number): Promise<number> {
    if (!!parentBranchId) {
        return treeDBInstance.transaction('rw', treeDBInstance.branch, async () => {
            return treeDBInstance.branch.put({
                treeId: treeId,
                description: description,
                status: TaskStatus.queued,
                parentBranchId: parentBranchId,
            });
        });
    }
    return treeDBInstance.transaction('rw', treeDBInstance.branch, async () => {
        return treeDBInstance.branch.put({
            treeId: treeId,
            description: description,
            status: TaskStatus.queued,
        });
    });
}

export function getChildBranches(parentBranchId: number): Promise<BranchRecord[]> {
    return treeDBInstance.branch.where('parentBranchId').equals(parentBranchId).toArray();
}

export function setBranchStatus(id: number, status: TaskStatus) {
    return treeDBInstance.branch.update(id, {status: status});
}

export function removeBranch(branch: BranchRecord) {
    getChildBranches(branch.id!)
        .then(result => result.map(branch => removeBranch(branch)))
        .then(() => treeDBInstance.branch.delete(branch.id!));
}

/*export function removeChildBranches(branchIds: number[]) {
    treeDBInstance.branch.bulkDelete(branchIds);
}*/
