import  { treeDBInstance } from './database.config';

export function addTree(name: string): Promise<number> {
    return treeDBInstance.transaction('rw', treeDBInstance.tree, async () => {
        return treeDBInstance.tree.put({name: name});
    });
}

export async function removeTree(id: number): Promise<void> {
    await treeDBInstance.branch.where('treeId').equals(id).delete();
    await treeDBInstance.tree.delete(id);
}