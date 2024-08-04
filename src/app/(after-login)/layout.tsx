import RQProvider from "@/components/r-q-provider";
import React from "react";

const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <RQProvider>
            {children}
        </RQProvider>
    );
};

export default Layout;