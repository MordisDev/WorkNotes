import { treeDBInstance, BranchRecord } from "../../../indexedDB/database";

export function getChildBranches(parentBranchId: number): Promise<BranchRecord[]> {
    return treeDBInstance.branch.where('parentBranchId').equals(parentBranchId).toArray();
}
