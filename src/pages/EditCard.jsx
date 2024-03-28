import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardsContext from "../contexts/CardsContext";
import { CardsActionTypes } from "../contexts/CardsContext";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 150px 0;
  .container {
    max-width: 1240px;
    margin: 0 auto;
  }
  .formGroup {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    > label {
      margin-bottom: 15px;
    }
    > input {
      width: 100%;
      height: 45px;
      border: 1px solid #c4c4c4;
      border-radius: 10px;
      padding: 7px 15px;
    }
    > textarea {
      width: 100%;
      height: 145px;
      border: 1px solid #c4c4c4;
      border-radius: 10px;
      padding: 7px 15px;
    }
  }
  .buttonWrap {
    text-align: center;
  }
  .button {
    width: 200px;
    border: 1px solid #333;
    color: #333;
    background: #fff;
    padding: 12px 35px;
    border-radius: 10px;
    transition: all 0.5s ease;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      border: 1px solid #c4c4c4;
      background: #c4c4c4;
      color: #333;
    }
  }
`;

const EditCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cards } = useContext(CardsContext);
  const { setCards } = useContext(CardsContext);
  const [editedCard, setEditedCard] = useState(null);

  useEffect(() => {
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setEditedCard({ ...cardToEdit });
    }
  }, [id, cards]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    setCards({
      type: CardsActionTypes.editCard,
      cardId: id,
      data: editedCard,
    });
    navigate(`/cards/${id}`);
  };

  if (!editedCard) {
    return <div>Loading...</div>;
  }

  return (
    <StyledDiv>
      <div className="container">
        <h2>Redaguoti klausima</h2>
        <div className="formGroup">
          <label>Klausimo pavadinimas:</label>
          <input
            type="text"
            name="title"
            value={editedCard.title}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="formGroup">
          <label>Klausimo aprašymas:</label>
          <textarea
            name="description"
            value={editedCard.description}
            onChange={handleInputChange}
            className="textarea"
          />
        </div>
        <div className="buttonWrap">
          <button onClick={saveChanges} className="button">
            Išsaugoti
          </button>
        </div>
      </div>
    </StyledDiv>
  );
};

export default EditCard;
