import { ITree } from "../Views/WorkTree/types/WorkTree";

/*
description: '',
status: 'queued';
isCompletedOnSubtasks?: boolean;
storyPoints?: number;
subtasks?: ITask[];
*/

/* export const WNTree: ITree = {
    name: 'Work Notes - first draft',
    tasks: [
        {
            description: '[Technical] Project setup',
            status: 'inherit',
            subtasks: [
                {
                    description: 'Setup single page structure',
                    status: 'queued',
                },
                {
                    description: 'Core page layout styles',
                    status: 'queued',
                },
                {
                    description: 'Integrate Font Awesome',
                    status: 'queued',
                },
                {
                    description: 'Planned feature tree JS file',
                    status: 'queued',
                },
            ],
        }
    ],
}

/*
[TopBar] Work Timer
    Timer that counts down daily and overall work time
    Options that allow to set up:
        Default daily work time
        Work days and holidays
    Corrections:
        At start and stop (Start At Hour, and Stop At Hour)
        Correct by amount of time (min)
    Check for sleep for automatic corrections?
[TopBar] Pomodoro Timer
    Timer with progress bar
    Green bar for break, orange bar for work time
    Interval counter
    Sound notification for timer completion
    Daily reset of interval counter
    Cancel, Pause, and Long Break buttons
[Body] Feature tree
    Create New Feature
    Jump through existing features
    Create steps and substeps
    Step Status (in queue, in progress, done)
    Step difficulty points
    Feature progress (based on dificulty)
    Add links to steps/substeps (info, help, mockups, etc.)
    Add deadlines
    Archive and delete features
*/