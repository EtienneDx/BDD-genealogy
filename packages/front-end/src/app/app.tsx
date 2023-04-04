import styles from './app.module.scss';
import FamilyTreeBuilder from './FamilyTreeBuilder';

const family = [
  { id: 1, pids: [2], name: 'Amber McKenzie', gender: 'female', img: 'https://cdn.balkan.app/shared/2.jpg', birthDate: '1980-01-01', deathDate: '2020-01-01' },
  { id: 2, pids: [1], name: 'Ava Field', gender: 'male', img: 'https://cdn.balkan.app/shared/m30/5.jpg' },
  { id: 3, mid: 1, fid: 2, name: 'Peter Stevens', gender: 'male', img: 'https://cdn.balkan.app/shared/m10/2.jpg' },
  { id: 4, mid: 1, fid: 2, name: 'Savin Stevens', gender: 'male', img: 'https://cdn.balkan.app/shared/m10/1.jpg' },
  { id: 5, mid: 1, fid: 2, name: 'Emma Stevens', gender: 'female', img: 'https://cdn.balkan.app/shared/w10/3.jpg' }
];

function BarMenu(): JSX.Element {
  return (
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
  );
}

export function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <BarMenu />
      <div>
        <FamilyTreeBuilder peoples={family}/>
      </div>
    </div>
  );
}

export default App;
