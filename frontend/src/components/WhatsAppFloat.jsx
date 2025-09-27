import React from "react";
import styled from "styled-components";
import { WhatsApp } from "@mui/icons-material";
const WA_NUMBER = "94763011488"; // <- your number without "+" or spaces
const DEFAULT_TEXT = "Hi! I'm interested in your Sri Lanka tours.";

const Bubble = styled.button`
  position: fixed;
  bottom: 24px;
  right: 16px;
  z-index: 9999;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  background: #25d366; /* WhatsApp green */
  box-shadow: 0 10px 25px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15);
  display: grid;
  place-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 12px 28px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.16);
  }

  &:active {
    transform: scale(0.98);
  }

  /* subtle “assistive touch” fade-in */
  animation: fadeIn 280ms ease-out;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const Ring = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35);
  opacity: 0.6;
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
  border: 0;
`;

function getWhatsappUrl(number, text) {
  // Works on desktop and mobile browsers
  const encoded = encodeURIComponent(text || "");
  return `https://wa.me/${number}?text=${encoded}`;
}

export default function WhatsAppFloat() {
  const ref = React.useRef(null);
  const posRef = React.useRef({ x: 0, y: 0 });
  const dragging = React.useRef(false);
  const startRef = React.useRef({ x: 0, y: 0, left: 0, top: 0 });

  // Restore saved position
  React.useEffect(() => {
    const saved = localStorage.getItem("wa_fab_pos");
    if (saved && ref.current) {
      const { left, top } = JSON.parse(saved);
      ref.current.style.left = `${left}px`;
      ref.current.style.top = `${top}px`;
      ref.current.style.right = "auto"; // switch to absolute position when restored
      ref.current.style.bottom = "auto";
      posRef.current = { x: left, y: top };
    }
  }, []);

  // Drag handlers (pointer events)
  const onPointerDown = (e) => {
    if (!ref.current) return;
    dragging.current = true;
    ref.current.setPointerCapture(e.pointerId);

    // Switch to absolute positioning for smooth drag
    const rect = ref.current.getBoundingClientRect();
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: rect.left,
      top: rect.top,
    };
  };

  const onPointerMove = (e) => {
    if (!dragging.current || !ref.current) return;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    const nextLeft = startRef.current.left + dx;
    const nextTop = startRef.current.top + dy;

    // Keep within viewport bounds
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnW = ref.current.offsetWidth;
    const btnH = ref.current.offsetHeight;

    const clampedLeft = Math.max(8, Math.min(vw - btnW - 8, nextLeft));
    const clampedTop = Math.max(8, Math.min(vh - btnH - 8, nextTop));

    ref.current.style.left = `${clampedLeft}px`;
    ref.current.style.top = `${clampedTop}px`;
    ref.current.style.right = "auto";
    ref.current.style.bottom = "auto";
    posRef.current = { x: clampedLeft, y: clampedTop };
  };

  const onPointerUp = (e) => {
    if (!ref.current) return;
    if (dragging.current) {
      dragging.current = false;
      ref.current.releasePointerCapture(e.pointerId);
      // Snap to nearest side (assistive-touch feel)
      const mid = window.innerWidth / 2;
      const currentLeft = posRef.current.x;
      const snappedLeft = currentLeft < mid ? 8 : window.innerWidth - ref.current.offsetWidth - 8;
      ref.current.style.left = `${snappedLeft}px`;
      posRef.current.x = snappedLeft;
      // Save
      localStorage.setItem(
        "wa_fab_pos",
        JSON.stringify({ left: posRef.current.x, top: posRef.current.y })
      );
    }
  };

  const handleClick = () => {
    const url = getWhatsappUrl(WA_NUMBER, DEFAULT_TEXT);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Bubble
      ref={ref}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={handleClick}
    >
      <SrOnly>Chat on WhatsApp</SrOnly>
        <WhatsApp style={{ color: "white", width: 32, height: 32 }} />
      <Ring />
    </Bubble>
  );
}
