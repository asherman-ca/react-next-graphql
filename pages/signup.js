import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';
import styled from 'styled-components';
import ResetPassword from '../components/ResetPassword';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const signup = props => (
    <Columns>
      <Signup />
      <Signin />
      <RequestReset />
      <ResetPassword token={props.query.token || ''} />
    </Columns>
);

export default signup;