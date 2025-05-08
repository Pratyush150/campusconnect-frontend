// src/components/VideoCall.jsx
import { useEffect } from 'react';

export default function VideoCall({ roomName }) {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName,
      width: "100%",
      height: 500,
      parentNode: document.getElementById('jitsi-container'),
    };
    // eslint-disable-next-line
    new window.JitsiMeetExternalAPI(domain, options);
  }, [roomName]);

  return <div id="jitsi-container" style={{ width: '100%', height: 500 }} />;
}
