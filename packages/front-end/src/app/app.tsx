import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPerson from './add-person-page';
import FamilyTreeDisplay from './family-tree-page';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FamilyTreeDisplay />} />
          <Route path="/add-person" element={<AddPerson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
