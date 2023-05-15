export interface IProjectDropdownProps {
  projectNames?: string[];
  selectedProject?: string;
  selectProject: (projectName: string) => void;
}
