"use client";

import { DOCTOR } from "@/lib/constants";

export default function WhatsAppButton() {
  const waUrl = `https://wa.me/${DOCTOR.phone.replace("+", "")}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-150"
      style={{ background: "#25D366" }}
    >
      <WhatsAppIcon />
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="white" aria-hidden="true">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.75-1.813A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.94 9.94 0 0 1-5.094-1.406l-.344-.21-4.594 1.078 1.063-4.47-.22-.36A9.945 9.945 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.094 4.906c-.25 0-.656.094-.969.438-.312.343-1.218 1.187-1.218 2.906 0 1.719 1.25 3.375 1.406 3.594.157.218 2.407 3.812 5.938 5.187 2.938 1.157 3.532.938 4.157.875.625-.062 2-.813 2.281-1.594.282-.78.282-1.437.188-1.593-.094-.157-.344-.25-.72-.438-.374-.187-2.218-1.094-2.562-1.218-.343-.125-.562-.188-.812.187-.25.375-.969 1.22-1.188 1.47-.218.25-.437.28-.812.094-.375-.188-1.594-.594-3.032-1.876-1.125-1-1.875-2.25-2.093-2.625-.219-.375-.024-.578.164-.766.168-.168.375-.437.562-.656.188-.219.25-.375.375-.625.125-.25.063-.469-.03-.657-.095-.187-.813-2.031-1.126-2.78-.28-.657-.562-.594-.781-.594l-.656-.031z" />
    </svg>
  );
}
