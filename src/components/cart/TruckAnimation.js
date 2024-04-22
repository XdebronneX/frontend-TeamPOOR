import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveTruck = keyframes`
  0% {
    left: -100px;
  }
  100% {
    left: 100px;
  }
`;

const movePackage = keyframes`
  0% {
    left: -100px;
  }
  100% {
    left: 100px;
  }
`;

const Truck = styled.div`
  width: 150px;
  margin: 0 auto;
  position: relative;
  animation: ${moveTruck} 3s ease-in-out infinite; /* Infinite loop */
  animation-fill-mode: forwards;
`;

const Package = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 30px;
  left: -100px;
  background-color: #FFD700; /* Adjust to your package color */
  border-radius: 5px;
  animation: ${movePackage} 3s ease-in-out infinite; /* Infinite loop */
  animation-fill-mode: forwards;
  animation-delay: 1s; /* Delay the animation to simulate the package being loaded */
`;

const TruckImage = styled.img`
  width: 100%;
  height: auto;
`;

const TruckAnimation = () => {
    return (
        <Truck>
            <TruckImage src="/images/truck.jpg" alt="Truck" />
        </Truck>
    );
};

export default TruckAnimation;
