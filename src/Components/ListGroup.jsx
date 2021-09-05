import React from "react";

function ListGroup(props) {
  const { itemsGenre, onHandleGenre, selectGenre } = props;
  return (
    <ul class="list-group">
      {itemsGenre.map((genre) => (
        <li
          style={{ cursor: "pointer" }}
          key={genre.key}
          onClick={() => onHandleGenre(genre)}
          class={
            selectGenre === genre ? "list-group-item active" : "list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
