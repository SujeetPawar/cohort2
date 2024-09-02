
import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import {
  jobAtom,
  messagingAtom,
  networkAtom,
  notificationsAtom,
  totalmessagingAtom,
} from "./atom";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationCount = useRecoilValue(jobAtom);
  const messagingNotificationCount = useRecoilValue(messagingAtom);
  const notificationCount = useRecoilValue(notificationsAtom);
  const totalNotificationCount = useRecoilValue(totalmessagingAtom);

  return (
    <>
      <button>Home</button>
      <button>
        My network(
        {networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
      </button>
      <button>Jobs({jobsNotificationCount})</button>
      <button>Messaging ({messagingNotificationCount})</button>
      <button>Notification ({notificationCount})</button>
      <button>Me({totalNotificationCount})</button>
    </>
  );
}

export default App;
