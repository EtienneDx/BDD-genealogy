import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPerson from './add-person-page';
import FamilyTreeDisplay from './family-tree-page';
import Login from './login-page';
import Register from './register-page';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FamilyTreeDisplay />} />
          <Route path="/add-person" element={<AddPerson />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
