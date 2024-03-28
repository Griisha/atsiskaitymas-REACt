import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import CardsContext from "../contexts/CardsContext";
import { CardsActionTypes } from "../contexts/CardsContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import Comment from "../components/Comment/Comment";
import deleteItem from "../assets/images/delete.png";

const StyledSection = styled.section`
  padding-top: 150px;

  > div {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;

    > h3 {
      margin: 0;
    }
    > p {
      margin: 0;
      text-align: justify;
    }
  }
  .cardItem {
    position: relative;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    padding: 30px 40px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
    width: 500px;
    margin: 0 auto;
  }
  .commentBox {
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    padding: 30px 40px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    width: 500px;
    margin: 0 auto;
    align-items: start;
  }
  .deleteImgBtn {
    position: absolute;
    right: 10px;
    top: 10px;
    background: transparent;
    outline: none;
    border: none;
  }
  .deleteImg {
    height: 20px;
  }
  .formWrapper {
    width: 500px;
    margin: 35px auto 0;
  }
  .formContent {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }
    > textarea {
      width: 100%;
      height: 145px;
      border: 1px solid #c4c4c4;
      border-radius: 10px;
      padding: 7px 15px;
    }
  }
  .fullWdth {
    width: 100%;
    text-align: center;
  }
  .formBtn {
    width: 200px;
    border: 1px solid #333;
    color: #333;
    background: #fff;
    padding: 12px 35px;
    border-radius: 10px;
    transition: all 0.5s ease;
    margin: 25px auto 0;
    text-align: center;
    cursor: pointer;
    &:hover {
      border: 1px solid #c4c4c4;
      background: #c4c4c4;
      color: #333;
    }
  }
  .pleaseLogin {
    font-size: 18px;
    text-align: center;
    > a {
      color: #c4c4c4;
      margin-left: 5px;
    }
  }
`;

const OneCardPage = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setCards, cards } = useContext(CardsContext);
  const card = cards.find((card) => card.id === id);

  // const [card, setCard] = useState([]);
  // useEffect(()=>{
  //   fetch(`http://localhost:8080/cards/${id}`)
  //     .then(res => res.json())
  //     .then(data => setCard(data));
  // },[id]);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(10, "Komentaras turi tureti ne mažiau nei 10 simboliu")
        .max(500, "Komentaras neturi buti ilgesnis nei 500 simboliu")
        .required("Laukelis privalomas")
        .trim(),
    }),
    onSubmit: (values) => {
      const newComment = {
        text: values.text,
        id: uuid(),
        authorId: loggedInUser.id,
      };
      // console.log(newComment);
      setCards({
        type: CardsActionTypes.addComment,
        comment: newComment,
        cardId: card.id,
      });
      formik.resetForm();
    },
  });

  return (
    <StyledSection>
      {cards.length && (
        <>
          <div className="cardItem">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {loggedInUser.id === card.userId && (
              <button
                className="deleteImgBtn"
                onClick={() => {
                  setCards({
                    type: CardsActionTypes.delete,
                    id: card.id,
                  });
                  navigation(-1);
                }}
              >
                <img className="deleteImg" src={deleteItem} alt="delete" />
              </button>
            )}
          </div>
          <div className="commentBox">
            {card.comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} cardId={card.id} />
            ))}
          </div>
          {loggedInUser ? (
            <form className="formWrapper" onSubmit={formik.handleSubmit}>
              <div className="formContent">
                <label htmlFor="text">Atsakyti:</label>
                <textarea
                  name="text"
                  id="text"
                  placeholder="Parašykite atsakymą..."
                  value={formik.values.text}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.text && formik.errors.text && (
                  <p>{formik.errors.text}</p>
                )}
              </div>
              <div className="fullWdth">
                <input className="formBtn" type="submit" value="Atsakyti" />
              </div>
            </form>
          ) : (
            <p className="pleaseLogin">
              Atsakyti galima tik prisijungus. Prašome
              <Link to="/user/login">prisijungti</Link>.
            </p>
          )}
        </>
      )}
    </StyledSection>
  );
};

export default OneCardPage;
