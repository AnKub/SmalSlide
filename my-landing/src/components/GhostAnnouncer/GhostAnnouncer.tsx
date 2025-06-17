import { useEffect, useRef, useState } from 'react';
import defaultAvatar from '/svg/avatar.svg';
import './GhostAnnouncer.scss';

const GhostAnnouncer = () => {
  const [showGhost, setShowGhost] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
 const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);


  const triggerGhost = () => {
    setShowGhost(true);
    setTimeout(() => setShowBubble(true), 3000); 
    bubbleTimer.current = setTimeout(() => setShowBubble(false), 5000); 
    setTimeout(() => setShowGhost(false), 30000); 
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(triggerGhost, 3000); 
  };

  useEffect(() => {
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    resetInactivityTimer(); 

    return () => {
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('keydown', resetInactivityTimer);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, []);

  return (
    <div className="ghost-container">
      {showGhost && (
        <div className="ghost-wrapper">
          {showBubble && <div className="ghost-bubble">Who you gonna call?</div>}
          <img src={defaultAvatar} alt="Ghost" className="ghost-image" />
        </div>
      )}
    </div>
  );
};

export default GhostAnnouncer;
