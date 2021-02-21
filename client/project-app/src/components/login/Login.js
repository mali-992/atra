import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { actions } from "../../redux/actions";
import * as Yup from "yup";
import * as userService from "../../services/user.service";
import { useHistory, Link } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { useState } from "react";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("this field is required!")
    .email("invalid email!"),
  password: Yup.string().required("this field is required!"),
});
function mapDispatchToProps(dispatch) {
  return {
    setUserName: (name) => dispatch(actions.setUserName(name)),
  };
}
function Login(props) {
  const { setUserName } = props;
  const history = useHistory();
  const [authFaild, setAuthFaild] = useState(false);
  const login = async (values) => {
    try {
      const { user, token } = await userService.login(values);
      localStorage.setItem("token", token);
      setUserName(user.name);
      history.push("/nav/countriesSnapshot");
    } catch (error) {
      setAuthFaild(true);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-lg-center">
        <div className="col col-lg-6">
          <h1>Log In</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={login}
            validationSchema={loginSchema}
          >
            <Form>
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  placeholder="email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                login
              </button>
            </Form>
          </Formik>
          <ErrorAlert isFail={authFaild} />
          <Link to="/signup">sign up</Link>
        </div>
      </div>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(Login);
