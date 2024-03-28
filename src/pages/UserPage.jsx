import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsContext from "../contexts/CardsContext";
import UsersContext from "../contexts/UsersContext";
import Card from "../components/Card/Card";
import styled from "styled-components";

const StyledSection = styled.section`
  padding-top: 150px;
  > h1 {
    text-align: center;
  }
  > p {
    text-align: center;

    > a {
      width: 200px;
      border: 1px solid #333;
      color: #333;
      background: #fff;
      padding: 12px 35px;
      border-radius: 10px;
      transition: all 0.5s ease;
      margin: 0 auto;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        border: 1px solid #c4c4c4;
        background: #c4c4c4;
        color: #333;
      }
    }
  }
  > div {
    margin: 65px auto 0;
    width: 80%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
  > p:last-child {
    padding-top: 50px;
    font-size: 3rem;
  }
`;

const UserPage = () => {
  const { cards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();
  const userCards = cards.filter((card) => card.userId === loggedInUser.id);

  return (
    <StyledSection>
      <h1>Visi {loggedInUser.userName} klausimai</h1>
      <p>
        <Link to="/cards/addNew">Naujas klausimas</Link>
      </p>
      {userCards.length ? (
        <div>
          {userCards.map((card) => (
            <Card key={card.id} data={card} location={location} />
          ))}
        </div>
      ) : (
        <p>Jus dar nieko nepaklausete...</p>
      )}
    </StyledSection>
  );
};

export default UserPage;
