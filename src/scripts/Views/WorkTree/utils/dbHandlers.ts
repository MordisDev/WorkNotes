import { treeDBInstance, TreeRecord, BranchRecord, TaskStatus } from '../indexedDB/database';

export function getTree(id: number): Promise<TreeRecord | undefined> {
    return treeDBInstance.tree.get(id);
}

export function getTrees(): Promise<TreeRecord[]> {
    return treeDBInstance.tree.toArray();
}

export function getChildBranches(parentBranchId: number): Promise<BranchRecord[]> {
    return treeDBInstance.branch.where('parentBranchId').equals(parentBranchId).toArray();
}

export function setBranchStatus(id: number, status: TaskStatus) {
    return treeDBInstance.branch.update(id, {status: status});
}

export function removeBranch(branch: BranchRecord) {
    if(branch.parentBranchId) setBranchStatus(branch.parentBranchId, TaskStatus.queued);
    getChildBranches(branch.id!)
        .then(result => result.map(branch => removeBranch(branch)))
        .then(() => treeDBInstance.branch.delete(branch.id!));
}

/*export function removeChildBranches(branchIds: number[]) {
    treeDBInstance.branch.bulkDelete(branchIds);
}*/
