import React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'w-full rounded-lg py-1 font-medium',
    {
        variants: {
            variant: {
                light: 'bg-white text-text-001 border-[1px] border-text-001',
                dark: 'bg-text-001 text-white'
            },
        },
        defaultVariants: {
            variant: 'light',
        },
    },
);

type SquareButtonProps = {
    className?: string;
    buttonText: string,
    action?: () => void,
} & VariantProps<typeof buttonVariants>

const SquareButton = ({buttonText, className, action, variant}: SquareButtonProps) => {
    const handleClick = () => {
        action && action()
    }

    return (
        <button
            className={cn(buttonVariants({variant, className}))}
            type='button'
            onClick={handleClick}>
            {buttonText}
        </button>
    );
};

export default SquareButton;