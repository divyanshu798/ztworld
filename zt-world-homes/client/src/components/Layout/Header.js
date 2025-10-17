import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--praise-light);
  box-shadow: 0 4px 6px rgba(217, 119, 6, 0.1), 0 1px 3px rgba(217, 119, 6, 0.05);
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(217, 119, 6, 0.1);

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
    flex-direction: column;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(217, 119, 6, 0.1);
    border-top: 1px solid var(--praise-light);
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  position: relative;

  &:hover {
    color: var(--praise-orange);
    background: var(--praise-light);
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: linear-gradient(135deg, var(--praise-light) 0%, var(--praise-cream) 100%);
  border: 1px solid var(--praise-amber);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, var(--praise-cream) 0%, var(--praise-light) 100%);
    border-color: var(--praise-orange);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(217, 119, 6, 0.15);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  border: 1px solid var(--praise-light);
  border-radius: 0.75rem;
  box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1), 0 4px 6px rgba(217, 119, 6, 0.05);
  padding: 0.5rem 0;
  min-width: 180px;
  z-index: 1001;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, var(--praise-light) 0%, var(--praise-cream) 100%);
    color: var(--praise-orange);
    transform: translateX(4px);
  }

  &:first-child {
    border-radius: 0.75rem 0.75rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.75rem 0.75rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: linear-gradient(135deg, var(--praise-light) 0%, var(--praise-cream) 100%);
  border: 1px solid var(--praise-amber);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--praise-orange);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, var(--praise-cream) 0%, var(--praise-light) 100%);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Z&T World Homes</Logo>
        
        <NavLinks $isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/properties" onClick={() => setIsMenuOpen(false)}>
            Properties
          </NavLink>
          
          {user ? (
            <UserMenu>
              <UserButton onClick={toggleUserMenu}>
                {user.name} ▼
              </UserButton>
              {isUserMenuOpen && (
                <Dropdown>
                  <DropdownItem onClick={() => {
                    navigate('/dashboard');
                    setIsUserMenuOpen(false);
                    setIsMenuOpen(false);
                  }}>
                    Dashboard
                  </DropdownItem>
                  {isAdmin() && (
                    <DropdownItem onClick={() => {
                      navigate('/admin');
                      setIsUserMenuOpen(false);
                      setIsMenuOpen(false);
                    }}>
                      Admin Panel
                    </DropdownItem>
                  )}
                  <DropdownItem onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </Dropdown>
              )}
            </UserMenu>
          ) : (
            <>
              <NavLink 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-outline"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary"
              >
                Register
              </NavLink>
            </>
          )}
        </NavLinks>

        <MobileMenuButton onClick={toggleMenu}>
          ☰
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
