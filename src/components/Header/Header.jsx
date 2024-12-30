/* eslint-disable no-unused-vars */
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAsync } from '../../services/actions/AuthAction';
import { Nav } from 'react-bootstrap';

const navigation = [
    { name: 'Google Keep', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '28ch',
        '&:focus': {
          width: '48ch',
        },
      },
    },
  }));

// eslint-disable-next-line react/prop-types
const Header = ({ collapsed, toggleSidebar }) => {

    const { isSignIn } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userLogoutAsync());
        // navigate('/signIn');
    }

    return (
        <>
            <Disclosure as="nav" className="bg-white-800 fixed top-0 w-full z-10 shadow-xl">
                <div className="max-w-8xl px-4 py-3 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center cursor-pointer">
                                <img
                                    alt="Your Company"
                                    src="../src/assets/images/menu.png"
                                    className="h-6 w-auto" onClick={toggleSidebar} />
                            </div>
                            <div className="hidden sm:block">
                                <div className="flex space-x-4">
                                    <img src="../src/assets/images/logo.png" alt="Logo" className='h-24 w-full' />
                                </div>
                            </div>
                        </div>
                        <div className="inset-y-0 flex items-center ms-auto pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Search className='border-[1px] border-gray shadow-xl'>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search Notes…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </div>
                        <div className="inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ms-auto">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <img alt="Logo" src="../src/assets/images/google-keep.png" className="size-12 rounded" />
                                </div>
                            </Menu>
                            {
                                isSignIn ?  
                                <Button onClick={handleLogout} className='btn1 ms-4'>Sign Out</Button>
                                :
                                <Link to='/signIn'>
                                    <Button className='btn1 ms-4'>Sign In</Button>
                                </Link>
                            }
                            
                        </div>
                    </div>
                </div>

            </Disclosure>
        </>
    )
}
export default Header;