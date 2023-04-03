// eslint-disable-next-line @typescript-eslint/no-unused-vars

import styles from './app.module.scss';

import FamilyTree from './FamilyTree';

const people = [
  {
    name: 'John',
    surname: 'Doe',
    birthDate: 'January 1, 1950',
    deathDate: 'June 30, 2020',
    imageUrl: 'https://www.buzzwebzine.fr/wp-content/uploads/2022/08/signes-personne-ne-vous-aime-pas-1024x576.jpg'
  },
  {
    name: 'Jane',
    surname: 'Doe',
    birthDate: 'March 15, 1955',
    imageUrl: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg.webp'
  },
  // add more people here...
];

export function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1 className={styles.heading}>Family Tree</h1>
        <form>
          <div className={styles.inputGroup}>
            <input type="text" id="name-input" className={styles.input} placeholder="Name" />
            <input type="text" id="surname-input" className={styles.input} placeholder="Surname" />
            <input type="number" id="generations-input" className={styles.input} placeholder="Generations" />
            <button type="submit" id="submit-btn" className={styles.button}>Submit</button>
          </div>
          <div className={styles.treeType}>
            <label>
              <input type="radio" name="tree-type" value="ascendant" checked />
              <span className={styles.radioText}>Ascendant Tree</span>
            </label>
            <label>
              <input type="radio" name="tree-type" value="descendant" />
              <span className={styles.radioText}>Descendant Tree</span>
            </label>
          </div>
        </form>
      </div>
      <div>
        <FamilyTree people={people} />
      </div>
    </div>
  );
}

export default App;

