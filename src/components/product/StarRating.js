import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onStarClick }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div>
            {[1, 2, 3, 4, 5].map((index) => (
                <FaStar
                    key={index}
                    size={24}
                    style={{ marginRight: '5px', cursor: 'pointer' }}
                    color={(hoverRating || rating) >= index ? '#ffc107' : '#e4e5e9'}
                    onClick={() => onStarClick(index)}
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ))}
        </div>
    );
};

export default StarRating;