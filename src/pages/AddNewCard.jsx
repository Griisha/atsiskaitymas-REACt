import UsersContext from "../contexts/UsersContext";
import CardsContext from "../contexts/CardsContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { CardsActionTypes } from "../contexts/CardsContext";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  > h1 {
    font-size: 3rem;
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 500px;

    > div {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      > label {
        font-size: 18px;
        margin-bottom: 10px;
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
      > p {
        margin-top: 5px;
        margin-bottom: 0;
        color: red;
        text-align: center;
      }
    }
    .klausti {
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
    + p {
      color: red;
    }
  }
`;

const AddNewCard = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      const newCard = {
        id: uuid(),
        userId: loggedInUser.id,
        edited: false,
        comments: [],
        ...values,
      };
      // console.log(newCard);
      setCards({
        type: CardsActionTypes.addNew,
        data: newCard,
      });
      navigate(-1);
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, "Title must be at least 5 symbols length")
        .max(50, "Title can't be longer than 50 symbols")
        .required("This field must be filled")
        .trim(),
      description: Yup.string()
        .min(5, "Description must be at least 5 symbols length")
        .max(500, "Description can't be longer than 500 symbols")
        .required("This field must be filled")
        .trim(),
    }),
  });

  return (
    <StyledSection>
      <h1>Užduoti klausimą</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Klausimo pavadinimas:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Įrašykite klausimo pavadinimą..."
            value={formik.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <p>{formik.errors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Klausimo aprašymas:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Įrašykite klausimo aprašymą..."
            value={formik.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <p>{formik.errors.description}</p>
          )}
        </div>
        <input className="klausti" type="submit" value="Klausti" />
      </form>
    </StyledSection>
  );
};

export default AddNewCard;
