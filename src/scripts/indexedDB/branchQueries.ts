import  { treeDBInstance, TaskStatus } from './database.config';

export async function addBranch(description: string, treeId: number, parentBranchId?: number): Promise<void> {
    if (parentBranchId) await treeDBInstance.branch.update(parentBranchId, {status: TaskStatus.inherit});

    await treeDBInstance.transaction('rw', treeDBInstance.branch, async () => {
        await treeDBInstance.branch.put({
            treeId: treeId,
            description: description,
            status: TaskStatus.queued,
            ...(!!parentBranchId && {parentBranchId: parentBranchId}),
        });
    });
}

export async function removeBranch(id: number, parentId?: number): Promise<void> {
    const result = await treeDBInstance.branch.where('parentBranchId').equals(id).toArray();
    result.map(branch => removeBranch(branch.id!, branch.parentBranchId));
    await treeDBInstance.branch.delete(id);
    if (parentId) {
        const childArrayLength = (await treeDBInstance.branch.where('parentBranchId').equals(parentId).toArray()).length;
        if (!childArrayLength) await treeDBInstance.branch.update(parentId, {status: TaskStatus.queued});
    }
}