import React from 'react';
import CustomStepIndicator from './CustomStepIndicator';

const TrackingOrders = ({ orderStatus }) => {
    const steps = orderStatus.map(status => ({
        label: status.status,
        message: status.message
    }));
    
    const currentStepIndex = orderStatus.findIndex(status => status.status === 'COMPLETED') + 1;
    const currentStep = currentStepIndex > 0 ? currentStepIndex : 1;

    return (
        <div className="tracking-orders">
            <h2>Tracking Orders</h2>
            <CustomStepIndicator steps={steps} currentStep={currentStep} />
        </div>
    );
};

export default TrackingOrders;
