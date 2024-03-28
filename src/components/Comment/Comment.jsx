import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { CardsActionTypes } from "../../contexts/CardsContext";
import deleteItem from "../../assets/images/delete.png";
import edit from "../../assets/images/edit.png";
import profile from "../../assets/images/user-profile.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  width: 100%;
  position: relative;
  .questionProfile {
    height: 15px;
    margin-right: 5px;
    margin-left: 8px;
  }
  .commentItem {
    width: 100%;
    border-bottom: 1px solid #c4c4c4;
  }
  .deleteBtn {
    position: absolute;
    right: 10px;
    top: 10px;
    background: transparent;
    border: none;
    outline: none;
  }
  .absolutedItemEdit {
    position: absolute;
    top: -2px;
    right: 30px;
  }
  .editItem {
    height: 25px;
  }
`;

const Comment = ({ comment, cardId }) => {
  const { loggedInUser, users } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);
  const author = users.find((user) => user.id === comment.authorId);

  return (
    <>
      <StyledDiv>
        {users.length && (
          <div className="commentItem">
            <p>
              Atsake: <img className="questionProfile" src={profile} />
              {author.userName}
            </p>
            <p>{comment.text}</p>
            {loggedInUser.id === comment.authorId && (
              <button
                className="deleteBtn"
                onClick={() =>
                  setCards({
                    type: CardsActionTypes.deleteComment,
                    commentId: comment.id,
                    cardId: cardId,
                  })
                }
              >
                <img className="deleteImg" src={deleteItem} alt="delete" />
              </button>
            )}
            {loggedInUser.id === comment.authorId && (
              <div className="absolutedItemEdit">
                <button className="deleteBtn">
                  <Link to={`/cards/${cardId}/comments/${comment.id}/edit`}>
                    <img className="editItem" src={edit} alt="edit" />
                  </Link>
                </button>
              </div>
            )}
          </div>
        )}
      </StyledDiv>
    </>
  );
};

export default Comment;
