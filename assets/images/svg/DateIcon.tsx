import { FC } from "react";

interface Props {
  size: string;
}

const DateIcon: FC<Props> = ({ size }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={size}
    height={size}
    style={{ display: 'inline' }}
  >
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
  </svg>
)

export default DateIcon;
