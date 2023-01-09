import  { treeDBInstance } from '../../../indexedDB/database';

export function addTree(name: string): Promise<number> {
    return treeDBInstance.transaction('rw', treeDBInstance.tree, async () => {
        return treeDBInstance.tree.put({name: name});
    });
}