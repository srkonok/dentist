type IconProps = { className?: string };

export function ImplantIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Crown top */}
      <path d="M14 20 L14 14 L18 18 L24 12 L30 18 L34 14 L34 20 Z" strokeWidth="1.5"/>
      {/* Crown base */}
      <rect x="14" y="20" width="20" height="4" rx="1" strokeWidth="1.5"/>
      {/* Abutment */}
      <rect x="20" y="24" width="8" height="4" rx="1" strokeWidth="1.5"/>
      {/* Implant body */}
      <path d="M21 28 L21 38 Q21 40 24 40 Q27 40 27 38 L27 28" strokeWidth="1.5"/>
      {/* Threads */}
      <line x1="19" y1="31" x2="21" y2="31" strokeWidth="1.2"/>
      <line x1="19" y1="34" x2="21" y2="34" strokeWidth="1.2"/>
      <line x1="19" y1="37" x2="21" y2="37" strokeWidth="1.2"/>
      <line x1="27" y1="31" x2="29" y2="31" strokeWidth="1.2"/>
      <line x1="27" y1="34" x2="29" y2="34" strokeWidth="1.2"/>
      <line x1="27" y1="37" x2="29" y2="37" strokeWidth="1.2"/>
      {/* Tip */}
      <path d="M21 38 L24 42 L27 38" strokeWidth="1.5"/>
    </svg>
  );
}

export function WisdomToothIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Molar body */}
      <path d="M12 18 C10 18 9 20 9 23 C9 26 10 29 11 32 C12 35 13 37 15 38 C16.5 39 18 38.5 19 37 C20 35.5 21 34 24 34 C27 34 28 35.5 29 37 C30 38.5 31.5 39 33 38 C35 37 36 35 37 32 C38 29 39 26 39 23 C39 20 38 18 36 18 C34 18 33 20 30 21 C28 22 26 21 24 21 C22 21 20 22 18 21 C15 20 14 18 12 18 Z" strokeWidth="1.5"/>
      {/* Roots */}
      <path d="M18 34 C17.5 37 17 40 18 43" strokeWidth="1.5"/>
      <path d="M30 34 C30.5 37 31 40 30 43" strokeWidth="1.5"/>
    </svg>
  );
}

export function RootCanalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Tooth outline */}
      <path d="M14 14 C12 14 10 16 10 19 C10 22 11 25 12 28 C13 31 14 34 15 36 C16 38 17.5 39 19 38 C20.5 37 21 35 22 34 C22.5 33 23 33 24 33 C25 33 25.5 33 26 34 C27 35 27.5 37 29 38 C30.5 39 32 38 33 36 C34 34 35 31 36 28 C37 25 38 22 38 19 C38 16 36 14 34 14 C32 14 31 16 29 17 C27.5 18 26 17 24 17 C22 17 20.5 18 19 17 C17 16 16 14 14 14 Z" strokeWidth="1.5"/>
      {/* Pulp cavity */}
      <path d="M20 20 C19 20 18.5 21 18.5 23 C18.5 25 19 27 20 29 C20.5 30 21.5 31 22 32 C22.5 32.5 23 32.5 24 32.5 C25 32.5 25.5 32.5 26 32 C26.5 31 27.5 30 28 29 C29 27 29.5 25 29.5 23 C29.5 21 29 20 28 20 Z" strokeWidth="1.2"/>
      {/* Canal file tool */}
      <line x1="24" y1="10" x2="24" y2="30" strokeWidth="1.2" strokeDasharray="2 1.5"/>
      <rect x="22" y="7" width="4" height="4" rx="1" strokeWidth="1.5"/>
    </svg>
  );
}

export function CosmeticIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Tooth */}
      <path d="M13 17 C11 17 9 19 9 22 C9 25 10 28 11 31 C12 34 13 37 14 39 C15 41 17 42 19 41 C20.5 40 21 38 22.5 37 C23 36.5 23.5 36.5 24 36.5 C24.5 36.5 25 36.5 25.5 37 C27 38 27.5 40 29 41 C31 42 33 41 34 39 C35 37 36 34 37 31 C38 28 39 25 39 22 C39 19 37 17 35 17 C33 17 32 19 29 20 C27.5 20.5 26 20 24 20 C22 20 20.5 20.5 19 20 C16 19 15 17 13 17 Z" strokeWidth="1.5"/>
      {/* Sparkle 1 */}
      <path d="M40 10 L41 13 L44 14 L41 15 L40 18 L39 15 L36 14 L39 13 Z" strokeWidth="1.2"/>
      {/* Sparkle 2 small */}
      <path d="M8 9 L8.8 11.5 L11.5 12.5 L8.8 13.5 L8 16 L7.2 13.5 L4.5 12.5 L7.2 11.5 Z" strokeWidth="1"/>
      {/* Shine on tooth */}
      <path d="M17 20 C18 18.5 20 18 22 19" strokeWidth="1.2"/>
    </svg>
  );
}

export function OralSurgeryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Jaw arc */}
      <path d="M8 18 C8 14 11 12 14 12 L34 12 C37 12 40 14 40 18 L40 28 C40 36 34 42 24 44 C14 42 8 36 8 28 Z" strokeWidth="1.5"/>
      {/* Teeth */}
      <rect x="13" y="12" width="5" height="8" rx="1.5" strokeWidth="1.2"/>
      <rect x="20" y="12" width="5" height="9" rx="1.5" strokeWidth="1.2"/>
      <rect x="27" y="12" width="5" height="9" rx="1.5" strokeWidth="1.2"/>
      {/* Scalpel */}
      <line x1="36" y1="4" x2="44" y2="12" strokeWidth="1.5"/>
      <path d="M36 4 L40 4 L44 8 C43 11 40 12 38 10 Z" strokeWidth="1.2"/>
    </svg>
  );
}

export function CheckupIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Clipboard */}
      <rect x="10" y="8" width="28" height="34" rx="2" strokeWidth="1.5"/>
      <rect x="17" y="6" width="14" height="5" rx="2" strokeWidth="1.5"/>
      {/* Tooth sketch on clipboard */}
      <path d="M18 20 C17 20 16 21 16 23 C16 25 16.5 27 17 28.5 C17.5 30 18 31 19 31.5 C20 32 21 31.5 21.5 30.5 C22 29.5 22.5 29 24 29 C25.5 29 26 29.5 26.5 30.5 C27 31.5 28 32 29 31.5 C30 31 30.5 30 31 28.5 C31.5 27 32 25 32 23 C32 21 31 20 30 20 C29 20 28.5 21 27 21.5 C26 22 25 21.5 24 21.5 C23 21.5 22 22 21 21.5 C19.5 21 19 20 18 20 Z" strokeWidth="1.2"/>
      {/* Checkmark */}
      <polyline points="17,38 21,42 31,34" strokeWidth="2"/>
    </svg>
  );
}
