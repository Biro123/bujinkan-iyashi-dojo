import { useUserState } from '../../globalState/userState';

const Home = () => {
  const userState = useUserState();

  const userData = userState.user || {};  
  const userDataString = JSON.stringify(userData, null, 2);

  return (
    <div>
      <h2>Home Page</h2>
      <pre>User: {userData.name}</pre>
    </div>
  );
}
export default Home;