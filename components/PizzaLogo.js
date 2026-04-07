import React from 'react';
import Svg, { Circle, Path, G, Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

export default function PizzaLogo({ size = 60 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="pizzaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD54F" stopOpacity="1" />
          <Stop offset="100%" stopColor="#FFA726" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      
      {/* Pizza slice shape */}
      <Path
        d="M 50 50 L 85 20 A 45 45 0 0 1 85 80 Z"
        fill="url(#pizzaGrad)"
      />
      
      {/* Crust edge */}
      <Path
        d="M 85 20 A 45 45 0 0 1 85 80"
        stroke="#D84315"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Pepperoni */}
      <Circle cx="70" cy="40" r="5" fill="#D32F2F" />
      <Circle cx="75" cy="55" r="5" fill="#D32F2F" />
      <Circle cx="68" cy="65" r="4" fill="#D32F2F" />
      
      {/* Cheese spots */}
      <Circle cx="65" cy="48" r="3" fill="#FFF" opacity="0.9" />
      <Circle cx="72" cy="70" r="3" fill="#FFF" opacity="0.9" />
      <Circle cx="78" cy="35" r="2.5" fill="#FFF" opacity="0.9" />
      
      {/* Basil leaves */}
      <Path
        d="M 60 55 Q 62 53 64 55 Q 62 57 60 55"
        fill="#4CAF50"
      />
      <Path
        d="M 75 45 Q 77 43 79 45 Q 77 47 75 45"
        fill="#4CAF50"
      />
      
      {/* Melted cheese drips */}
      <Path
        d="M 82 75 Q 83 78 82 80"
        stroke="#FFE082"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

