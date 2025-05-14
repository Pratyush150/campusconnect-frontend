import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Group,
  Button,
  Container,
  Text,
  ActionIcon,
  Menu,
  Avatar,
  Burger,
  Drawer,
  Stack,
  Divider,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconSun, IconMoon, IconBell, IconUser, IconLogout, IconMessage, IconChevronDown } from '@tabler/icons-react';

function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      size="lg"
    >
      {dark ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}

const navLinks = [
  { to: '/', label: 'Feed' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/assignments', label: 'Assignments' },
  { to: '/projects', label: 'Projects' },
  { to: '/internships', label: 'Internships' },
  { to: '/resources', label: 'Resources' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/messages', label: 'Messages', icon: <IconMessage size={18} /> },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <nav style={{
      background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
      borderBottom: `1px solid ${theme.colors.gray[2]}`,
      padding: '0.5rem 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Container size="lg">
        <Group position="apart" noWrap>
          <Group spacing="xs">
            <Text
              weight={700}
              size="lg"
              color="blue"
              component={Link}
              to="/"
              style={{ textDecoration: 'none', letterSpacing: 1 }}
            >
              CampusConnect
            </Text>
            {/* Desktop nav links */}
            {user && (
              <Group spacing={0} className="hidden-mobile">
                {navLinks.map(link => (
                  <Button
                    key={link.to}
                    component={Link}
                    to={link.to}
                    variant="subtle"
                    leftIcon={link.icon}
                    size="md"
                    style={{ marginLeft: 2, marginRight: 2 }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Group>
            )}
          </Group>

          {/* Right section: Dark mode, notifications, user */}
          <Group spacing="xs">
            <DarkModeToggle />
            {user && (
              <>
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  onClick={() => navigate('/notifications')}
                  title="Notifications"
                >
                  <IconBell size={20} />
                </ActionIcon>
                {/* User avatar and menu */}
                <Menu withArrow position="bottom-end">
                  <Menu.Target>
                    <Group spacing={4} style={{ cursor: 'pointer' }}>
                      <Avatar color="blue" radius="xl" size="md">
                        {user.name?.[0]?.toUpperCase() || 'U'}
                      </Avatar>
                      <Text size="sm" weight={500}>{user.name}</Text>
                      <IconChevronDown size={16} />
                    </Group>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconUser size={18} />} component={Link} to="/profile">
                      Profile
                    </Menu.Item>
                    <Menu.Item icon={<IconMessage size={18} />} component={Link} to="/messages">
                      Messages
                    </Menu.Item>
                    <Menu.Item icon={<IconLogout size={18} />} color="red" onClick={logout}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
            {!user && (
              <>
                <Button component={Link} to="/login" variant="light" size="md">
                  Login
                </Button>
                <Button component={Link} to="/register" variant="filled" size="md">
                  Register
                </Button>
              </>
            )}
            {/* Hamburger for mobile */}
            {user && (
              <Burger
                opened={drawerOpened}
                onClick={() => setDrawerOpened(o => !o)}
                size="md"
                className="hidden-desktop"
                aria-label="Open navigation"
              />
            )}
          </Group>
        </Group>
      </Container>

      {/* Drawer for mobile navigation */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="80%"
        title="Menu"
        className="hidden-desktop"
      >
        <Stack spacing="sm">
          {navLinks.map(link => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant="subtle"
              leftIcon={link.icon}
              size="lg"
              onClick={() => setDrawerOpened(false)}
              fullWidth
            >
              {link.label}
            </Button>
          ))}
          <Divider />
          <Button variant="outline" color="red" onClick={logout} fullWidth>
            Logout
          </Button>
        </Stack>
      </Drawer>

      {/* Responsive CSS (add to your main CSS file or index.css) */}
      <style>
        {`
          @media (max-width: 900px) {
            .hidden-mobile { display: none !important; }
            .hidden-desktop { display: inline-block !important; }
          }
          @media (min-width: 901px) {
            .hidden-mobile { display: inline-flex !important; }
            .hidden-desktop { display: none !important; }
          }
        `}
      </style>
    </nav>
  );
}
