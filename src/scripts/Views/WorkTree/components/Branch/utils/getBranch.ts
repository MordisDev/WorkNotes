import { treeDBInstance, BranchRecord } from "../../../indexedDB/database";

export async function getBranch(id: number): Promise<BranchRecord> {
    const branch = await treeDBInstance.branch.get(id)
    if (!branch) throw new Error(`There is no branch with id ${id}`);
    return branch;
}