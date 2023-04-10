import FamilyTree from './my-tree';
import { Person } from './person';

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