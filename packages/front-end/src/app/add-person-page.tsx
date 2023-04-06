import styles from './add-person.module.scss';
import { useState } from "react";

function AddPerson(): JSX.Element {
  const [children, setChildren] = useState<string[]>([]);

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

  return (
    <div className={styles.container}>
      <h1>Add person</h1>
      <form>
        <div className={styles.formGroup}>
          <input type="text" id="name-input" placeholder="Name" />
          <input type="text" id="surname-input" placeholder="Surname" />
          <label> Birth date </label>
          <input type="date" id="birth-date" />
          <label> Death date </label>
          <input type="date" id="death-date" />
          <input type="text" id="father-input" placeholder="Father" />
          <input type="text" id="mother-input" placeholder="Mother" />
          <input type="text" id="Partner-input" placeholder="Partner" />

          {children.map((childName, index) => (
            <div key={index} className={styles.childFormGroup}>
              <input
                type="text"
                placeholder="Child"
                value={childName}
                onChange={(e) => handleChildNameChange(index, e.target.value)}
              />
              <button
                type="button"
                className={styles.removeChildButton}
                onClick={() => handleRemoveChild(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button type="button" className={styles.addChildButton} onClick={handleAddChild}>
            Add Child
          </button>

          <button type="submit" id="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;
