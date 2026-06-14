"use client";

interface LogoSvgProps {
  className?: string;
  size?: number;
}

export default function LogoSvg({ className = "", size = 40 }: LogoSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Tooth silhouette */}
      <circle cx="20" cy="20" r="20" fill="#0d9488" />
      <path
        d="M20 8c-2.5 0-4.5 1.2-5.5 3-1-.5-2.5-.8-3.5 0-1.5 1.2-1.5 3.5-.5 5 .8 1.2 1 2.5.8 4L10 26c-.3 2 1 3.5 2.5 3s2-2 2.5-4l1-3c.3-1 1.5-1 2 0l1 3c.5 2 1 3.5 2.5 4s2.8-1 2.5-3l-1.3-6c-.2-1.5 0-2.8.8-4 1-1.5 1-3.8-.5-5-1-.8-2.5-.5-3.5 0C21.5 9.2 22.5 8 20 8z"
        fill="white"
        opacity="0.95"
      />
      {/* Cross / plus medical symbol */}
      <rect x="18.5" y="14" width="3" height="9" rx="1" fill="#0d9488" />
      <rect x="15.5" y="17" width="9" height="3" rx="1" fill="#0d9488" />
    </svg>
  );
}
