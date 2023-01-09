import { treeDBInstance, TreeRecord } from '../indexedDB/database';

export function getTrees(ids?: number[]): Promise<(TreeRecord | undefined)[]> {
    if (ids) return treeDBInstance.tree.bulkGet(ids);
    return treeDBInstance.tree.toArray();
}