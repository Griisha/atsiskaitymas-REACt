import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import UsersContext from "../contexts/UsersContext";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { UsersActionTypes } from "../contexts/UsersContext";
import bcrypt from "bcryptjs";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

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
    .register {
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

const Register = () => {
  const navigate = useNavigate();
  const [sameNameError, setSameNameError] = useState(false);
  const { users, setUsers, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      passwordRepeat: "",
    },
    onSubmit: (values) => {
      if (users.find((user) => user.userName === values.userName)) {
        setSameNameError(true);
      } else {
        const newUser = {
          id: uuid(),
          userName: values.userName,
          password: bcrypt.hashSync(values.password, 8),
          passwordNoHash: values.password,
          role: "user",
        };
        setUsers({
          type: UsersActionTypes.addNew,
          data: newUser,
        });
        setLoggedInUser(newUser);
        navigate("/");
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(4, "Vartotojo vardas turi buti nuo 4 simboliu")
        .max(20, "Vartotojo vardas turi buti iki 20 simboliu")
        .required("Laukelis butinas")
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          "Slaptazodis maziausiai turi tureti: 1 mazaja raide, 1 didziaja raide, 1 skaiciu, 1 spec simboli, ir ilgis turi buti nuo 8 iki 25 simboliu"
        )
        .required("Laukelis butinas")
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Slaptazodziai turi atitikti")
        .required("Laukelis butinas")
        .trim(),
    }),
  });

  return (
    <StyledSection>
      <h1>Registruotis į Autotaška</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">Vartotojo vardas:</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Įrašykite vartotojo vardą..."
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
            placeholder="įrašykite slaptažodi..."
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="passwordRepeat">Pakartokite slaptažodi:</label>
          <input
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            placeholder="Pakartokite slaptažodi..."
            value={formik.values.passwordRepeat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.passwordRepeat && formik.errors.passwordRepeat && (
            <p>{formik.errors.passwordRepeat}</p>
          )}
        </div>
        <input type="submit" className="register" value="Registruotis" />
      </form>
      {sameNameError && <p>Vartotojo vardas jau užimtas</p>}
    </StyledSection>
  );
};

export default Register;
