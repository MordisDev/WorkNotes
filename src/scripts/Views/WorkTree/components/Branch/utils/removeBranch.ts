import { treeDBInstance, TaskStatus } from "../../../indexedDB/database";

export async function removeBranch(id: number, parentId?: number): Promise<void> {
    const result = await treeDBInstance.branch.where('parentBranchId').equals(id).toArray();
    result.map(branch => removeBranch(branch.id!, branch.parentBranchId));
    await treeDBInstance.branch.delete(id!);
    if (parentId) {
        const childArrayLength = (await treeDBInstance.branch.where('parentBranchId').equals(parentId).toArray()).length;
        if (!childArrayLength) await treeDBInstance.branch.update(parentId, {status: TaskStatus.queued});
    }
}
