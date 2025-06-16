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
    setTimeout(() => setShowBubble(true), 1000); // Через 1с
    bubbleTimer.current = setTimeout(() => setShowBubble(false), 2000); // Через 2с
    setTimeout(() => setShowGhost(false), 8000); // Припустимо рух 8 секунд
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(triggerGhost, 3000); // 30 секунд бездіяльності
  };

  useEffect(() => {
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    resetInactivityTimer(); // Запускаємо з самого початку

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
