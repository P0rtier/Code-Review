export interface IStatusDropdownProps {
    projectNames: string[];
    selectedProject?: string;
    selectProject: (projectName: string) => void;
};