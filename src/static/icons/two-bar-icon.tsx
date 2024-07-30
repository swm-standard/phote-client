import React from 'react';

const TwoBarIcon = ({className}: { className?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512"
             className={className}>
            <path
                d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l352 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48 128zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32l352 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48 320z"/>
        </svg>
    );
};

export default TwoBarIcon;
