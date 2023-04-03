import styles from './FamilyTree.module.scss';
import FamilyTree from './MyTree';


// function PersonDisplay(person: Person, index: number) {
//   return (
//     <div className={styles.person} key={index}>
//       <img src={person.imageUrl} alt={`${person.name} ${person.surname}`} />
//       <div className={styles.info}>
//         <h2>{person.name} {person.surname}</h2>
//         <p>Born: {person.birthDate}</p>
//         {person.deathDate && <p>Died: {person.deathDate}</p>}
//       </div>
//     </div>
//   );
// }

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

// const FamilyTreeBuilder = ({ peoples }: FamilyTreeProps) => {
//   return (
//     <div className={styles.familyTree}>
//       {peoples.map((person, index) => (
//         PersonDisplay(person, index) 
//       ))}
//     </div>
//   );
// };

const FamilyTreeBuilder = ({ peoples }: FamilyTreeProps) => {
  return (
    <div style={{ height: '100%' }}>
      <FamilyTree nodes={peoples} />
    </div>
  );
};


export default FamilyTreeBuilder;