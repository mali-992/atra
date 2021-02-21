import Alert from "react-bootstrap/Alert";

export default function ErrorAlert(props) {
  const { content,isFail } = props;
  return <Alert show={isFail} variant="danger">
    שם משתמש או סיסמה שגויים
  </Alert>;
}
