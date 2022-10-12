import Ingredient from './ingredient';

function Receipt({
  name, ingredients, instructions, difficulty, pictureUrl,
}) {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={Math.random()}
            ingredient={ingredient}
          />
        ))}

      </td>
      <td>{instructions}</td>
      <td>{difficulty}</td>
      <td><img src={pictureUrl} alt={name} /></td>
    </tr>
  );
}

export default Receipt;
