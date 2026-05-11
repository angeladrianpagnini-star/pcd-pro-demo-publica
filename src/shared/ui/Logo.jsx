export function Logo({ size = 48, variant = "dark" }) {
  const textColor = variant === "light" ? "#ffffff" : "#15202b";

  return (
    <svg
      aria-label="PCD Pro"
      className="pcd-logo"
      height={size}
      role="img"
      viewBox="0 0 96 96"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#087f5b" height="96" rx="18" width="96" />
      <path
        d="M48 15 76 31v34L48 81 20 65V31l28-16Z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path
        d="M48 22 69 34v26L48 73 27 60V34l21-12Z"
        fill="#15202b"
        opacity="0.94"
      />
      <circle cx="48" cy="48" fill="#ffffff" r="18" />
      <path
        d="M48 31c6 5 10 10 12 17-2 7-6 12-12 17-6-5-10-10-12-17 2-7 6-12 12-17Z"
        fill="#087f5b"
      />
      <path
        d="M31 48h34M48 31v34M37 38c7 5 15 5 22 0M37 58c7-5 15-5 22 0"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <circle cx="48" cy="48" fill="#1f6feb" r="5" />
      <path
        d="M68 70c5-3 8-7 10-13M28 70c-5-3-8-7-10-13"
        fill="none"
        stroke="#1f6feb"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <text
        fill={textColor}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="0"
      >
        PCD Pro
      </text>
    </svg>
  );
}
