// eslint-disable-next-line @typescript-eslint/no-unused-vars

import styles from './app.module.scss';

export function App(): JSX.Element {
  return (
    <div className={styles.container}>
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

export default App;

