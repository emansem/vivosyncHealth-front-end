"use client";
export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
      {/* SVG content here */}
      <g transform="translate(10, 5)">
        <circle cx="30" cy="35" r="25" fill="#269c65" />
        <path
          d="M15 35 L25 35 L28 20 L33 50 L38 25 L43 35 L48 35"
          stroke="white"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <text
        x="70"
        y="45"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="28"
      >
        <tspan fill="#269c65">VivoSync</tspan>
        <tspan fill="#269c65" fontWeight="600">
          Health
        </tspan>
      </text>
      <text
        x="70"
        y="65"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="500"
        fill="#ccc"
      >
        Advancing Life Through Connected Care
      </text>
    </svg>
  );
}
