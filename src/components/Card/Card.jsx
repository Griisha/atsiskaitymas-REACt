import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import profile from "../../assets/images/user-profile.png";
import deleteItem from "../../assets/images/delete.png";
import comment from "../../assets/images/message.svg";
import { CardsActionTypes } from "../../contexts/CardsContext";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  border: 1px solid #333;
  border-radius: 10px;
  padding: 30px 40px;
  text-decoration: none;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  position: relative;
  > div {
    > h3 {
      margin: 0;
      font-size: 21px;
      line-height: 28px;
      color: #333;
      margin-bottom: 10px;
      min-height: 56px;
    }
    > p {
      margin: 0;
      text-align: justify;
      min-height: 105px;
      font-size: 16px;
      line-height: 21px;
      color: #333;
    }
  }
  .profileText {
    display: flex;
    align-items: end;
    color: #333;
  }
  .questionProfile {
    height: 25px;
    margin-right: 5px;
  }
  .wrapperText {
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 100%;
  }
  .commentsWrapper {
    > div {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #333;
      margin-top: 2px;
      > img {
        height: 20px;
        margin-top: -2px;
      }
    }
  }
  .deleteBtn {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .deleteItem {
    height: 20px;
  }
  .absolutedItem {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const Card = ({ data, location }) => {
  const { setCards } = useContext(CardsContext);
  const { users, loggedInUser } = useContext(UsersContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = users.find((user) => user.id === data.userId);
    if (user) {
      setUserName(user.userName);
    }
  }, [users, data.userId]);

  return (
    <Link className="cardItem" to={`/cards/${data.id}`}>
      <StyledDiv>
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
        <div className="wrapperText">
          {userName && (
            <p className="profileText">
              <img className="questionProfile" src={profile} /> {userName}
            </p>
          )}{" "}
          <div className="commentsWrapper">
            <div>
              <img src={comment} alt="comments" />{" "}
              {data && data.answers.length ? data && data.answers.length : 0}
            </div>
          </div>
        </div>
        {location.pathname !== "/cards/allCards" && (
          <div className="absolutedItem">
            {loggedInUser && userName === loggedInUser.userName && (
              <button
                className="deleteBtn"
                onClick={(event) => {
                  event.preventDefault();
                  setCards({
                    type: CardsActionTypes.delete,
                    id: data.id,
                  });
                }}
              >
                <img className="deleteItem" src={deleteItem} alt="delete" />
              </button>
            )}
          </div>
        )}
      </StyledDiv>
    </Link>
  );
};

export default Card;
