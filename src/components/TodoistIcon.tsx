/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TodoistIconProps {
  className?: string;
  size?: number;
}

export default function TodoistIcon({ className = '', size = 24 }: TodoistIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`${className} text-[#E44232]`}
    >
      {/* Todoist clean signature check hexagon representation or triple-check layout */}
      <g transform="translate(2, 2)">
        <polygon
          points="10 14.5 5.5 10 7 8.5 10 11.5 15.5 6 17 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="10 18.5 2.5 11 4 9.5 10 15.5 18.5 7 20 8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
        <polygon
          points="10 22.5 0 12.5 1.5 11 10 19.5 21.5 8 23 9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.15"
        />
      </g>
    </svg>
  );
}

