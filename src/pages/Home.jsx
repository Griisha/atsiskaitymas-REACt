import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsContext from "../contexts/CardsContext";
import Card from "../components/Card/Card";
import styled from "styled-components";
import UsersContext from "../contexts/UsersContext";

const StyledSection = styled.section`
  padding: 150px 0 70px 0;
  > h1 {
    text-align: center;
  }
  .topWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  > p {
    text-align: center;

    > a {
      text-decoration: none;
      padding: 5px 12px;
      border: 1px solid black;
      border-radius: 10px 5px;
      transition: 0.3s;
    }
    > a:hover {
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
  }
  .container {
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .linkBtn {
    border: 1px solid #333;
    background: #333;
    color: #fff;
    text-decoration: none;
    padding: 12px 35px;
    border-radius: 10px;
    transition: all 0.5s ease;
    &:hover {
      border: 1px solid #c4c4c4;
      background: #c4c4c4;
      color: #333;
    }
  }
  .cardsWrapper {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    display: grid;
  }
  .filters {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    > p {
      font-size: 21px;
      color: #333;
      margin-right: 7px;
    }
    > button {
      border: 1px solid #333;
      color: #333;
      background: #fff;
      text-decoration: none;
      padding: 12px 35px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.5s ease;
      &:hover {
        border: 1px solid #c4c4c4;
        background: #c4c4c4;
        color: #333;
      }
    }
  }
  .pleaseLogin {
    font-size: 18px;
    > a {
      color: #c4c4c4;
    }
  }
  .sortingWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .filters__right {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    > p {
      font-size: 21px;
      color: #333;
      margin-right: 7px;
    }
    > button {
      border: 1px solid #333;
      color: #333;
      background: #fff;
      text-decoration: none;
      padding: 12px 35px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.5s ease;
      &:hover {
        border: 1px solid #c4c4c4;
        background: #c4c4c4;
        color: #333;
      }
    }
  }
`;

const Home = () => {
  const { cards } = useContext(CardsContext);
  const location = useLocation();
  const { loggedInUser } = useContext(UsersContext);
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("many");

  const sortedCards = (filteredCards) => {
    return filteredCards.sort((a, b) => {
      if (sorting === "many") {
        return b.comments.length - a.comments.length;
      } else {
        return a.comments.length - b.comments.length;
      }
    });
  };

  const filteredCards = () => {
    switch (filter) {
      case "noAnswer":
        return cards.filter((card) => card.comments.length === 0);
      case "withAnswer":
        return cards.filter((card) => card.comments.length > 0);
      default:
        return cards;
    }
  };

  const displayedCards = sortedCards(filteredCards());

  return (
    <StyledSection>
      <div className="container">
        <div className="topWrapper">
          <h1>Visi klausimai</h1>
          {loggedInUser ? (
            <p>
              <Link className="linkBtn" to="/cards/addNew">
                Užduok klausimą
              </Link>
            </p>
          ) : (
            <p className="pleaseLogin">
              Klausti galima tik prisijungus. Prašome{" "}
              <Link to="/user/login">prisijungti</Link>.
            </p>
          )}
        </div>
        <div className="sortingWrapper">
          <div className="filters">
            <p>Filtruoti pagal:</p>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Visi</option>
              <option value="noAnswer">Be atsakymų</option>
              <option value="withAnswer">Su atsakymais</option>
            </select>
          </div>
          <div className="filters__right">
            <p>Rikiuoti pagal:</p>
            <select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="many">Daugiausiai atsakymų</option>
              <option value="notmany">Mažiausiai atsakymų</option>
            </select>
          </div>
        </div>
        <div className="cardsWrapper">
          {displayedCards.map((card) => (
            <Card key={card.id} data={card} location={location} />
          ))}
        </div>
      </div>
    </StyledSection>
  );
};

export default Home;
