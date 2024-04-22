import React from 'react';

const CustomStepIndicator = ({ steps, currentStep }) => {
    return (
        <div className="custom-step-indicator">
            {steps.map((step, index) => (
                <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''}`}>
                    <span>{step}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomStepIndicator;
