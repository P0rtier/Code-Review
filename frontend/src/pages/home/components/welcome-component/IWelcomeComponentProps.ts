export interface IWelcomComponentProps {
    projectNames: string[];
    selectedProject?: string;
    selectProject: (projectName: string) => void;
};