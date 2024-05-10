import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

interface UserIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ width = 24, height = 24, color = 'currentColor' }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile")
  }

  return (
    <S.Icon onClick={handleProfile}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="796 796 200 200" // Adjusted viewBox according to provided SVG
        fill={color} // Using color prop to fill the SVG
      >
        {/* Updated SVG path with a transparent background */}
        <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817C943.037,973.621,920.691,983.86,896,983.86z"/>
      </svg>
    </S.Icon>
  );
};

export default UserIcon;
