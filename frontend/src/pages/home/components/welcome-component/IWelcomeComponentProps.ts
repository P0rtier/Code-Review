export interface IWelcomeComponentProps {
  projectNames: string[];
  selectedProject?: string;
  selectProject: (projectName: string) => void;
  loadingState: boolean;
}
