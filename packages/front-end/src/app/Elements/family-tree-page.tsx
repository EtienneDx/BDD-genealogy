import { Link } from 'react-router-dom';
import styles from './family-tree-page.module.scss';
import FamilyTreeBuilder from '../Utils/family-tree-builder';
import BarMenu from './bar-menu';

const family = [
  {
    id: 1,
    pids: [2],
    name: 'Amber McKenzie',
    gender: 'female',
    img: 'https://cdn.balkan.app/shared/2.jpg',
    birthDate: '1980-01-01',
    deathDate: '2020-01-01',
  },
  {
    id: 2,
    pids: [1],
    name: 'Ava Field',
    gender: 'male',
    img: 'https://cdn.balkan.app/shared/m30/5.jpg',
  },
  {
    id: 3,
    mid: 1,
    fid: 2,
    name: 'Peter Stevens',
    gender: 'male',
    img: 'https://cdn.balkan.app/shared/m10/2.jpg',
  },
  {
    id: 4,
    mid: 1,
    fid: 2,
    name: 'Savin Stevens',
    gender: 'male',
    img: 'https://cdn.balkan.app/shared/m10/1.jpg',
  },
  {
    id: 5,
    mid: 1,
    fid: 2,
    name: 'Emma Stevens',
    gender: 'female',
    img: 'https://cdn.balkan.app/shared/w10/3.jpg',
  },
];

export function FamilyTreeDisplay(): JSX.Element {
  return (
    <div className={styles.container}>
      <BarMenu />
      <Link to="/add-person" className={styles.add}>
        Add Person
      </Link>
      <div>
        <FamilyTreeBuilder people={family} />
      </div>
    </div>
  );
}

export default FamilyTreeDisplay;
