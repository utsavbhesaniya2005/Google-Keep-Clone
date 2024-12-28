import { Link } from 'react-router';
import './Sidebar.css'
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Sidebar = ({collapsed}) => {

    const [menuItemIndex, setMenuItemIndex] = useState(null);

    const menuItems = [
        { name: 'Notes', icon: '../src/assets/images/notes-icon.png' }
    ];

    const handleClick = (index) => {
        setMenuItemIndex(index);
    }
    
    return(
        <>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="menubar">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`flex items-center p-3 ${menuItemIndex === index ? 'active' : ''}`}
                                onClick={() => handleClick(index)}
                                style={index == 0 && menuItemIndex === null ? { backgroundColor: '#FDF0C3' } : {}}
                            >
                                <img
                                    src={item.icon}
                                    alt={`${item.name} Icon`}
                                    className="h-8 me-8"
                                />
                                <Link to="/" className="text-md menu-item">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Sidebar;