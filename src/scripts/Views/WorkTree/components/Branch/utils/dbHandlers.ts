import { TaskStatus, BranchRecord, treeDBInstance } from "../../../indexedDB/database";

export function setBranchStatus(id: number, status: TaskStatus) {
    return treeDBInstance.branch.update(id, {status: status});
}

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