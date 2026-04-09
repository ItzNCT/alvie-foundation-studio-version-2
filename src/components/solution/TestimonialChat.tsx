import { useState, useEffect, useRef, useCallback } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

interface Message {
  from: "client" | "alvie";
  text: string;
}

const conversations: Message[][] = [
  [
    { from: "client", text: "We need to redesign our website but we don't know where to start." },
    { from: "alvie", text: "Let's start with what makes your business special. Tell me about your best client interaction." },
    { from: "client", text: "That's... not what we expected you to ask." },
    { from: "alvie", text: "That's exactly why we start there. The answer to your digital presence is already in your daily operations." },
  ],
  [
    { from: "client", text: "Every agency just shows us templates and mood boards." },
    { from: "alvie", text: "We don't do mood boards first. We do research. Then every design decision has a strategic reason." },
    { from: "client", text: "So it's not just about making things pretty?" },
    { from: "alvie", text: "Beauty with purpose. That's the difference between decoration and design." },
  ],
];

const TypingIndicator = () => (
  <div
    style={{
      display: "flex",
      gap: 4,
      padding: "14px 18px",
      background: "hsl(var(--primary) / 0.07)",
      borderRadius: "12px 12px 12px 4px",
      width: "fit-content",
    }}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "hsl(var(--foreground) / 0.3)",
          animation: `scroll-pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
        }}
      />
    ))}
  </div>
);

const TestimonialChat = () => {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const wait = (ms: number) =>
    new Promise<void>((res) => {
      const id = setTimeout(res, ms);
      const check = setInterval(() => {
        if (cancelRef.current) {
          clearTimeout(id);
          clearInterval(check);
          res();
        }
      }, 100);
    });

  const runLoop = useCallback(async () => {
    cancelRef.current = false;
    while (!cancelRef.current) {
      for (const conv of conversations) {
        if (cancelRef.current) return;
        setVisibleMessages([]);
        setShowTyping(false);
        await wait(400);

        for (const msg of conv) {
          if (cancelRef.current) return;
          if (msg.from === "alvie") {
            setShowTyping(true);
            await wait(1200);
            if (cancelRef.current) return;
            setShowTyping(false);
          }
          setVisibleMessages((prev) => [...prev, msg]);
          await wait(1500);
        }
        await wait(3000);
      }
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (isVisible) {
      runLoop();
    } else {
      cancelRef.current = true;
    }
    return () => {
      cancelRef.current = true;
    };
  }, [isVisible, reducedMotion, runLoop]);

  // Static fallback
  if (reducedMotion) {
    return (
      <div
        ref={containerRef}
        style={{
        maxWidth: "100%",
          borderRadius: 16,
          border: "1px solid hsl(var(--foreground) / 0.06)",
          padding: 32,
          background: "hsl(var(--background))",
        }}
      >
        <div className="font-body" style={{ fontWeight: 500, fontSize: 14, color: "hsl(var(--foreground) / 0.4)", marginBottom: 16 }}>
          💬 ALVIE × Client
        </div>
        <div style={{ height: 1, background: "hsl(var(--foreground) / 0.06)", marginBottom: 20 }} />
        {conversations[0].map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.from === "alvie" ? "flex-end" : "flex-start",
              marginBottom: 12,
            }}
          >
            <div
              className="font-body"
              style={{
                padding: "14px 18px",
                borderRadius: msg.from === "alvie" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                background: msg.from === "alvie" ? "hsl(var(--secondary) / 0.07)" : "hsl(var(--primary) / 0.07)",
                maxWidth: "80%",
                fontSize: 14,
                color: "hsl(var(--foreground) / 0.8)",
                lineHeight: 1.6,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: "100%",
        borderRadius: 16,
        border: "1px solid hsl(var(--foreground) / 0.06)",
        padding: 32,
        background: "hsl(var(--background))",
        minHeight: 320,
      }}
    >
      <div className="font-body" style={{ fontWeight: 500, fontSize: 14, color: "hsl(var(--foreground) / 0.4)", marginBottom: 16 }}>
        💬 ALVIE × Client
      </div>
      <div style={{ height: 1, background: "hsl(var(--foreground) / 0.06)", marginBottom: 20 }} />

      {visibleMessages.map((msg, i) => (
        <div
          key={`${msg.text.slice(0, 10)}-${i}`}
          style={{
            display: "flex",
            justifyContent: msg.from === "alvie" ? "flex-end" : "flex-start",
            marginBottom: 12,
            animation: "fade-in 400ms ease-out",
          }}
        >
          <div
            className="font-body"
            style={{
              padding: "14px 18px",
              borderRadius: msg.from === "alvie" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
              background: msg.from === "alvie" ? "hsl(var(--secondary) / 0.07)" : "hsl(var(--primary) / 0.07)",
              maxWidth: "80%",
              fontSize: 14,
              color: "hsl(var(--foreground) / 0.8)",
              lineHeight: 1.6,
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {showTyping && (
        <div style={{ animation: "fade-in 300ms ease-out" }}>
          <TypingIndicator />
        </div>
      )}
    </div>
  );
};

export default TestimonialChat;
