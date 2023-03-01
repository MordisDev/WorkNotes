import Dexie from "dexie";

export enum TaskStatus {
    queued = 'queued',
    working = 'working',
    done = 'done',
    inherit = 'inherit',
}

export class TreeRecord {
    id?: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class BranchRecord {
    id?: number;
    treeId: number;
    parentBranchId?: number;
    description: string;
    status: TaskStatus;
    deadline?: string;
    storyPoints?: number;

    constructor(id: number, treeId: number, parentBranchId: number, description: string, status: TaskStatus, deadline: string, storyPoints: number) {
        this.id = id;
        this.treeId = treeId;
        this.parentBranchId = parentBranchId;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
        this.storyPoints = storyPoints;
    }
}

class WorkTreeDatabase extends Dexie {
    tree!: Dexie.Table<TreeRecord, number>;
    branch!: Dexie.Table<BranchRecord, number>;

    constructor() {
        super('WorkTreeDatabase');

        this.version(1).stores({
            tree: '++id, &name',
            branch: '++id, treeId, parentBranchId, description, status, deadline, storyPoints',
        });

        this.tree.mapToClass(TreeRecord);
        this.branch.mapToClass(BranchRecord);
    }
}

export const treeDBInstance = new WorkTreeDatabase();