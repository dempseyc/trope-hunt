import { useState } from "react";
import { useStoreState } from "../store/store";
import Button from "@mui/material/Button";
import LoginChoices from "./LoginChoices";
import CarouUserForm from "./CarouUserForm";

const EmailLogin = () => {
  return <CarouUserForm createMode={false} />;
};

const EmailCreate = () => {
  return <CarouUserForm createMode={true} />;
};

const messageList = (messages) => {
  const ms = messages.map((m, i) => {
    return <li key={`m-${i}`}>{m}</li>;
  });
  return <ul key="message-list">{ms}</ul>;
};

const LoginModule = () => {
  // const authFB = () => {
  //     window.FB.login(response => {
  //         if (response.status === "connected") {
  //             window.FB.api('/me', (response) => {
  //                 console.log(response);
  //                 // hit a useraction
  //             })
  //         }
  //         console.log(response)
  //     })
  // }

  // const authLogoutFB = () => {
  //     window.FB.logout(response => {
  //         console.log(response)
  //     })
  // }

  const ready = useStoreState((state) => state.users.ready);
  const messages = useStoreState((state) => state.users.messages);

  const [mode, setMode] = useState("init");

  const modePattern = {
    init: (
      <LoginChoices
        setMode={setMode}
        //   authFB={authFB}
        //   authLogoutFB={authLogoutFB}
      />
    ),
    email: <EmailLogin />,
    // fb: <FaceBookLogin />,
    // google: <GoogleLogin />,
    create: <EmailCreate />,
  };

  return (
    <div className={"login-choices"}>
      {mode !== "init" && (
        <Button key="login-choice-back" onClick={() => setMode("init")}>
          Back to Login Choices
        </Button>
      )}
      {modePattern[mode]}
      {messageList(messages)}
    </div>
  );
};

export default LoginModule;
