import { FC } from 'react';
import Header from '../header/Header';

const Layout: FC = ({ children }) => (
    <>
        <Header />
        {children}
    </>
);

export default Layout;