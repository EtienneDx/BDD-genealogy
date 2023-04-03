import styles from './FamilyTree.module.scss';

function PersonDisplay(person: Person, index: number) {
  return (
    <div className={styles.person} key={index}>
      <img src={person.imageUrl} alt={`${person.name} ${person.surname}`} />
      <div className={styles.info}>
        <h2>{person.name} {person.surname}</h2>
        <p>Born: {person.birthDate}</p>
        {person.deathDate && <p>Died: {person.deathDate}</p>}
      </div>
    </div>
  );
}

type Person = {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  deathDate?: string;
  imageUrl: string;
  childrenIds?: number[];
  parentsIds?: number[];
};

type FamilyTreeProps = {
  peoples: Person[];
};

const FamilyTree = ({ peoples }: FamilyTreeProps) => {
  return (
    <div className={styles.familyTree}>
      {peoples.map((person, index) => (
        PersonDisplay(person, index) 
      ))}
    </div>
  );
};


export default FamilyTree;