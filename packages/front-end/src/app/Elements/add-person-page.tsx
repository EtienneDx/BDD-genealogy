import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './add-person.module.scss';
import backendUrl from '../Utils/backend-service';

function AddPerson(): JSX.Element {
  const [children, setChildren] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [partner, setPartner] = useState('');

  const handleAddChild = () => {
    setChildren([...children, '']);
  };

  const handleChildNameChange = (index: number, value: string) => {
    const newChildren = [...children];
    newChildren[index] = value;
    setChildren(newChildren);
  };

  const handleRemoveChild = (index: number) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name,
      surname,
      birthDate,
      deathDate,
      father,
      mother,
      partner,
      children,
    };
    try {
      const response = await fetch(backendUrl() + '/add-person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to='/' className={styles.familytree}>Family Tree</Link>
      <h1>Add person</h1>
      <form className={styles.formAddPerson} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type='text'
            id='name-input'
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type='text'
            id='surname-input'
            placeholder='Surname'
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <label> Birth date </label>
          <input
            type='date'
            id='birth-date'
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
          <label> Death date </label>
          <input
            type='date'
            id='death-date'
            value={deathDate}
            onChange={(event) => setDeathDate(event.target.value)}
          />
          <input
            type='text'
            id='father-input'
            placeholder='Father'
            value={father}
            onChange={(event) => setFather(event.target.value)}
          />
          <input
            type='text'
            id='mother-input'
            placeholder='Mother'
            value={mother}
            onChange={(event) => setMother(event.target.value)}
          />
          <input
            type='text'
            id='Partner-input'
            placeholder='Partner'
            value={partner}
            onChange={(event) => setPartner(event.target.value)}
          />

          {children.map((childName, index) => (
            <div key={index} className={styles.childFormGroup}>
              <input
                type='text'
                placeholder='Child'
                value={childName}
                onChange={(e) => handleChildNameChange(index, e.target.value)}
              />
              <button
                type='button'
                className={styles.removeChildButton}
                onClick={() => handleRemoveChild(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type='button'
            className={styles.addChildButton}
            onClick={handleAddChild}
          >
            Add Child
          </button>

          <button type='submit' id='submit-btn' className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPerson;
