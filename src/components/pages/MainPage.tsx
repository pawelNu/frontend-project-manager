import { Link } from 'react-router-dom';
import { TSidebarItem } from '../layout/Sidebar';
import { sidebarElements } from '../common';

export const MainPage = () => {
    return (
        <div className="container m-3">
            <h1>Main Page</h1>
            <p>All links in app</p>
            <SidebarLinks items={sidebarElements} />
            {/* <SidebarTOC items={sidebarElements} /> */}
        </div>
    );
};

const SidebarLinks = ({ items }: { items: TSidebarItem[] }) => {
    return (
        <ul className="ml-4 list-disc">
            {items.map((item, index) => (
                <li key={index}>
                    {item.linkTo ? (
                        <Link to={item.linkTo} className="text-blue-600 hover:underline custom-nav-link">
                            {item.label}
                        </Link>
                    ) : (
                        <span>{item.label}</span>
                    )}
                    {item.subMenu && <SidebarLinks items={item.subMenu} />}
                </li>
            ))}
        </ul>
    );
};
