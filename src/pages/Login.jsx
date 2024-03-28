import { useContext, useState } from "react";
import UsersContext from "../contexts/UsersContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
import bcrypt from "bcryptjs";

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
      > p {
        margin-top: 5px;
        margin-bottom: 0;
        color: red;
        text-align: center;
      }
    }
    .prisijungti {
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

const Login = () => {
  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const { users, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      const loggedInUser = users.find(
        (user) =>
          user.userName === values.userName &&
          bcrypt.compareSync(values.password, user.password)
      );

      if (loggedInUser === undefined) {
        setWrongCredentials(true);
      } else {
        setLoggedInUser(loggedInUser);
        navigate("/");
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Laukelis butinas").trim(),
      password: Yup.string().required("Laukelis butinas").trim(),
    }),
  });

  return (
    <StyledSection>
      <h1>Prisijungti prie Autotaško</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">Vartotojo vardas:</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Įrašykite vartotojo varda..."
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.userName && formik.errors.userName && (
            <p>{formik.errors.userName}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Slaptažodis:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Įrašykite slaptažodi..."
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <input type="submit" className="prisijungti" value="Prisijungti" />
      </form>
      {wrongCredentials && <p>Tokio vartotojo neegzistuoja</p>}
    </StyledSection>
  );
};

export default Login;
