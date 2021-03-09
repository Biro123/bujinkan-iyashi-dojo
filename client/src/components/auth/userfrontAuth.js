import Userfront from '@userfront/react';

// These ar ethe defalt forms provided by userFront
// As the passwordreset form handles both initiation
// and receipt, we use the default for simplicity

Userfront.init(process.env.REACT_APP_UF_INIT);

export const SignUp = Userfront.build({
  toolId: process.env.REACT_APP_UF_SIGNUP
})
export const SignIn = Userfront.build({
  toolId: process.env.REACT_APP_UF_SIGNIN,
});
export const PasswordReset = Userfront.build({
  toolId: process.env.REACT_APP_UF_RESET,
});
// export const LogoutButton = Userfront.build({
//   toolId: process.env.REACT_APP_UF_LOGOUT
// });
