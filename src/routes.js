import { createAppContainer  } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import SignIn from './pages/signIn';
import Main from './pages/main';
import Farm from './pages/farms';
import ConfirmData from './pages/confirmData'
const RoutesCtn = createStackNavigator({
  SignIn,
  // SignUp,
  Main,
  Farm,
  ConfirmData,
});

const Routes = createAppContainer(RoutesCtn);

export default Routes;