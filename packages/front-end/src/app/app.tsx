import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPerson from './Elements/add-person-page';
import FamilyTreeDisplay from './Elements/family-tree-page';
import Login from './Elements/login-page';
import Register from './Elements/register-page';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<FamilyTreeDisplay />} />
          <Route path='/add-person' element={<AddPerson />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
