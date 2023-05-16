export interface IGraphComponentProps {
  parseData: () => { name: string; value: number }[];
  title: string;
  isTime?: boolean;
}
