import styles from './FamilyTree.module.css';

type Person = {
  name: string;
  surname: string;
  birthDate: string;
  deathDate?: string;
  imageUrl: string;
};

type FamilyTreeProps = {
  people: Person[];
};

const FamilyTree = ({ people }: FamilyTreeProps) => {
  return (
    <div className={styles.familyTree}>
      {people.map((person, index) => (
        <div className={styles.person} key={index}>
          <img src={person.imageUrl}/>
          <div className={styles.info}>
            <h2>{person.name} {person.surname}</h2>
            <p>Born: {person.birthDate}</p>
            {person.deathDate && <p>Died: {person.deathDate}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FamilyTree;