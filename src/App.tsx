import { FluentProvider, webLightTheme, Button, Title3 } from "@fluentui/react-components";
import { useState, useRef } from "react";
import './App.css';

const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsLeft(POMODORO_DURATION);
  };

  // Cute emoji and friendly theme
  return (
    <FluentProvider theme={webLightTheme} style={{ minHeight: '100vh', background: '#fff8f0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <span style={{ fontSize: 64, marginTop: 24 }}>??</span>
        <Title3 as="h1" style={{ color: '#ff6f61', fontWeight: 700, fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
          Between Time Pomodoro
        </Title3>
        <div style={{ fontSize: 48, fontWeight: 600, color: '#333', background: '#fff3e6', borderRadius: 16, padding: '16px 32px', boxShadow: '0 2px 8px #ffdac1' }}>
          {formatTime(secondsLeft)}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button appearance="primary" onClick={startTimer} disabled={isRunning}>
            Start
          </Button>
          <Button appearance="secondary" onClick={pauseTimer} disabled={!isRunning}>
            Pause
          </Button>
          <Button appearance="outline" onClick={resetTimer}>
            Reset
          </Button>
        </div>
        <div style={{ color: '#ff6f61', fontFamily: 'Comic Sans MS, Comic Sans, cursive', marginTop: 16 }}>
          Stay focused and take breaks! You got this! ??
        </div>
      </div>
    </FluentProvider>
  );
}
