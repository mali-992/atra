import { connect } from "react-redux";
import Badge from "react-bootstrap/Badge";
function mapStateToProps(state) {
  return {
    name: state.userReducer.user.name,
  };
}

function Hello(props) {
  const { name } = props;
  return (
    <h3>
      <Badge variant="primary">Hello {name}</Badge>
    </h3>
  );
}
export default connect(mapStateToProps)(Hello);
