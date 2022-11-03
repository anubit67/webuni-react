import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DogCards from './DogCards';
import DogForm from './DogForm';

function App() {
  const initialDoggies = [{
    name: 'Buksi',
    url: 'https://i.ytimg.com/vi/3ThdpJ7LllM/hqdefault.jpg',
    id: 1,
  }, {
    name: 'Cerberus',
    url: 'https://media.threatpost.com/wp-content/uploads/sites/103/2019/08/13124059/Cerberus.jpg',
    id: 2,
  }];

  const [dogs, setDogs] = useState(initialDoggies);
  const onSave = (dog) => setDogs([...dogs, dog]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DogCards dogs={dogs} setDogs={setDogs} />} path="/" />
        <Route element={<DogForm onSave={onSave} />} path="/new" />
        <Route element={<h1>404 not found</h1>} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
