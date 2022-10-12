import Receipt from './receipt';

function App() {
  const recipes = [{
    id: 1,
    name: 'Rántotta',
    ingredients: [
      '2 tojás',
      'egy csipet só',
    ],
    instructions: 'Feltörjük, megsütjük, finom lesz.',
    difficulty: 3,
    pictureUrl: 'https://kemenytojas.com/wp-content/uploads/rantotta-serpenyoben.jpg',
  }, {
    id: 2,
    name: 'Chilis bab',
    ingredients: [
      'Olaj',
      '50 dkg darált sertéshús',
      '1 fej vöröshagyma',
      '4 gerezd fokhagyma',
      '1 konzerv bab',
      '1 konzerv kukorica',
      '1 konzerv paradicsom',
      '1 tk chili',
      'Só ízlés szerint',
      'Bors ízlés szerint',
    ],
    instructions: 'Hagymát és fokhagymát felaprítjuk. Az olajat felhevítjük és hozzáadjuk a hagymát és a fokhagymát. Ha már üvegessé vált a hagyma hozzáadjuk a darált húst. Megvárjuk még a hús átsül és utána hozzáadjuk a kukoricát, babot és a paradicsomot. Ezután fűszerezzük meg és keverjük össze. Folyamatos kavargatás mellett főzzük tovább kb 10 percig.',
    difficulty: 4,
    pictureUrl: 'https://kemenytojas.com/wp-content/uploads/chilis-bab-keszitese-3.jpg',
  }, {
    id: 3,
    name: 'Banánturmix',
    ingredients: [
      '2 db banán',
      '2-3 dl tej',
      'opcionális zabpehely',
    ],
    instructions: 'Pucoljuk meg a banánt és daraboljuk fel majd tegyük bele a turmixgépbe. Adjunk hozzá tetszőleges mennyiségű zabpelyhet. Öntsük hozzá a tejet és turmixoljuk össsze.',
    difficulty: 1,
    pictureUrl: 'https://www.gasztromanko.hu/wp-content/uploads/bananturmix-2.jpg',
  },
  ];
  return (
    <div className="App">
      <header>
        <h1>Receptkönyv</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Név</th>
            <th>Hozzávalók</th>
            <th>Elkészítés</th>
            <th>Nehézség</th>
            <th>Kép</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <Receipt
              key={recipe.id}
              name={recipe.name}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              difficulty={recipe.difficulty}
              pictureUrl={recipe.pictureUrl}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
