import './App.css';

function Receipt({name, ingredients, instructions, difficulty, pictureUrl}) {
  return (
    <tr>
      <td>{name}</td>
      <td>{ingredients}</td>
      <td>{instructions}</td>
      <td>{difficulty}</td>
      <td><img src={pictureUrl} alt={name}></img></td>
    </tr>
  )
}

export default Receipt;
