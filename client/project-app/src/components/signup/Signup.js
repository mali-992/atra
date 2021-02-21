import { Formik, Form, Field, ErrorMessage } from "formik";
import {connect} from "react-redux"
import {actions} from "../../redux/actions"
import * as Yup from "yup";
import {useHistory,Link} from "react-router-dom"; 
import * as userService from "../../services/user.service";
const signupSchema = Yup.object().shape({
  name: Yup.string().required("this field is require"),
  email: Yup.string().required("this field is require").email("invalid email"),
  password: Yup.string()
    .required("this field is require")
    .min(6, "minimum length is 6"),
});

function mapDispatchToProps(dispatch) {
  return {
      setUserName: (name) => dispatch(actions.setUserName(name))
  }
}

function Signup(props) {
  const {setUserName}=props
  const history=useHistory();
  const signup = async (values) => {
    try {
      debugger;
     const {user,token}= await userService.signup(values);
     localStorage.setItem('token',token)
     setUserName(user.name)
      history.push("/nav/countriesSnapshot")
    } catch (error) {

      alert(error);
    }
  };
  return (
    <div>
      <h1>register form</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={signup}
        validationSchema={signupSchema}
      >
        <Form>
            <div className="form-group">
            <Field
              type="name"
              name="name"
              placeholder="name"
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
            register
          </button>
        </Form>
      </Formik>
      <Link to="/login">login</Link>
    </div>
  );
}

export default connect(null,mapDispatchToProps)(Signup)