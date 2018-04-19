import { signInMutation, signUpMutation } from "../apollo/queries";
import { compose, graphql, withApollo } from "react-apollo";
import { GlobalMenu } from "../scenes/global/global-menu";
import { signIn, signOut } from "../helpers";

const enableCaptcha = process.env.REACT_APP_DISABLE_CAPTCHA !== "true";

const GlobalMenuWithData = compose(
  withApollo,
  graphql(signInMutation, {
    props: props => ({
      ...props.ownProps,
      onSignIn: (username, password) =>
        props
          .mutate({
            variables: { username, password }
          })
          .then(response => {
            const signInData = response.data.signIn;
            if (signInData) {
              return signIn(props.ownProps.client, signInData.jwt);
            } else {
              throw new Error("Sign in failed");
            }
          })
    })
  }),
  graphql(signUpMutation, {
    props: props => ({
      ...props.ownProps,
      client: undefined,
      enableCaptcha: enableCaptcha,
      onSignUp: (username, email, password, captcha) =>
        props
          .mutate({
            variables: { user: { username, email, password }, captcha }
          })
          .then(response => {
            const signUpData = response.data.signUp;
            if (signUpData) {
              return signIn(props.ownProps.client, signUpData.jwt);
            } else {
              throw new Error("Sign up failed");
            }
          }),
      onSignOut: () => signOut(props.ownProps.client)
    })
  })
)(GlobalMenu);

export default GlobalMenuWithData;
