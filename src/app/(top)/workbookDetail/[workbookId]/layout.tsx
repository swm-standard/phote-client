import React, {ReactNode} from 'react';

const Layout = ({
                    children,
                    dialog,
                }: {
    children: ReactNode;
    dialog: ReactNode;
}) => {
    return (
        <>
            {children}
            {dialog}
        </>
    );
};

export default Layout;
