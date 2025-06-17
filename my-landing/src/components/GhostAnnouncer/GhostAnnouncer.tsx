import { useEffect, useRef, useState } from 'react';
import defaultAvatar from '/svg/avatar.svg';
import './GhostAnnouncer.scss';

const INACTIVITY_DELAY = 4000; 
const GHOST_DURATION = 10000;  
const BUBBLE_APPEAR_TIME = GHOST_DURATION / 2; 
const BUBBLE_DURATION = GHOST_DURATION - BUBBLE_APPEAR_TIME; 

const GhostAnnouncer = () => {
  const [showGhost, setShowGhost] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGhost = () => {
    setShowGhost(true);

    setTimeout(() => setShowBubble(true), BUBBLE_APPEAR_TIME);

    bubbleTimer.current = setTimeout(() => setShowBubble(false), GHOST_DURATION);

    hideTimer.current = setTimeout(() => setShowGhost(false), GHOST_DURATION);
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(triggerGhost, INACTIVITY_DELAY);
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
      if (hideTimer.current) clearTimeout(hideTimer.current);
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
