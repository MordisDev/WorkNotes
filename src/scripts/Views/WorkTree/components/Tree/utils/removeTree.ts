import  { treeDBInstance } from '../../../indexedDB/database';

export async function removeTree(id: number): Promise<void> {
    await treeDBInstance.branch.where('treeId').equals(id).delete();
    await treeDBInstance.tree.delete(id);
}