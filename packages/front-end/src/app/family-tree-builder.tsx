import FamilyTree from './my-tree';

type Person = {
  id: number;
  pids?: number[];
  mid?: number;
  fid?: number;
  name?: string;
  gender?: string;
  img?: string;
  birthDate?: string;
  deathDate?: string;
};

type FamilyTreeProps = {
  people: Person[];
};

const FamilyTreeBuilder = ({ people }: FamilyTreeProps) => {
  return (
    <div style={{ height: '100%' }}>
      <FamilyTree nodes={people} />
    </div>
  );
};


export default FamilyTreeBuilder;