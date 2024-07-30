import React from 'react';

const NumberCircle = ({number}: { number: number }) => {
    return (
        <div className='w-5 h-5 pt-[1px] border-[1px] flex items-center justify-center border-text-004 rounded-full'>
            <span className='text-text-002 text-[10px] font-bold'>{number}</span>
        </div>
    );
};

export default NumberCircle;