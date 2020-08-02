import { buildClient } from "../api/build-client";
import { userSelector } from "../store/slices/userSlice";
import { useDispatch, useSelector } from 'react-redux'

const LandingPage = ({ currentUser }) => {
  const reduxUser = useSelector(userSelector)

  return (
    <div>
      {reduxUser.user?.email}
      <h1>{reduxUser.user?.email ? "You are signed in" : "You are not signed in"}</h1>
    </div>
  );
};

LandingPage.getInitialProps = () => {
};

export default LandingPage;
