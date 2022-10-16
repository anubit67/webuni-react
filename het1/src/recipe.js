import Ingredient from './ingredient';

function Recipe({
  name, ingredients, instructions, difficulty, pictureUrl,
}) {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
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

export default Recipe;
