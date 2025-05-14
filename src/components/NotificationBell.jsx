import { useState } from 'react';
import { ActionIcon, Group, Notification } from '@mantine/core';
import { IconBell, IconX } from '@tabler/icons-react';
import { useNotifications } from '../context/NotificationProvider';

export default function NotificationBell() {
  const [opened, setOpened] = useState(false);
  const { notifications, removeNotification } = useNotifications();

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      <ActionIcon
        variant={opened ? 'filled' : 'light'}
        color="blue"
        size="lg"
        onClick={() => setOpened(o => !o)}
      >
        <IconBell />
      </ActionIcon>

      {opened && (
        <Group direction="column" spacing="xs" mt="xs">
          {notifications.map(n => (
            <Notification
              key={n.id}
              title={n.type}
              onClose={() => removeNotification(n.id)}
              withCloseButton
            >
              {n.message}
            </Notification>
          ))}
        </Group>
      )}
    </div>
  );
}
