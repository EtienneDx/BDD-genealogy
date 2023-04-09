import FamilyTree from './MyTree';

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
  peoples: Person[];
};

const FamilyTreeBuilder = ({ peoples }: FamilyTreeProps) => {
  return (
    <div style={{ height: '100%' }}>
      <FamilyTree nodes={peoples} />
    </div>
  );
};


export default FamilyTreeBuilder;