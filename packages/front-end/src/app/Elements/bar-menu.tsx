import { useState } from 'react';
import styles from './family-tree-page.module.scss';
import { Link } from 'react-router-dom';
import backendUrl from '../Utils/backend-service';

export function BarMenu(): JSX.Element {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [generations, setGenerations] = useState('');
  const [treeType, setTreeType] = useState('ascendant');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(backendUrl + '/api/family-tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, generations, treeType }),
      });
      const data = await response.json();
      console.log(data);
      // TODO: Display the family tree in your app
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.containerHeader}>
      <h1 className={styles.heading}>Family Tree</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="name-input"
            className={styles.input}
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            id="surname-input"
            className={styles.input}
            placeholder="Surname"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <input
            type="number"
            id="generations-input"
            className={styles.input}
            placeholder="Generations"
            value={generations}
            onChange={(event) => setGenerations(event.target.value)}
          />
          <button type="submit" id="submit-btn" className={styles.button}>
            Submit
          </button>
        </div>
        <div className={styles.treeType}>
          <label>
            <input
              type="radio"
              name="tree-type"
              value="ascendant"
              checked={treeType === 'ascendant'}
              onChange={(event) => setTreeType(event.target.value)}
            />
            <span className={styles.radioText}>Ascendant Tree</span>
          </label>
          <label>
            <input
              type="radio"
              name="tree-type"
              value="descendant"
              checked={treeType === 'descendant'}
              onChange={(event) => setTreeType(event.target.value)}
            />
            <span className={styles.radioText}>Descendant Tree</span>
          </label>
        </div>
      </form>
      <Link to="/login" className={styles.login}>
        Login
      </Link>
    </div>
  );
}

export default BarMenu;
