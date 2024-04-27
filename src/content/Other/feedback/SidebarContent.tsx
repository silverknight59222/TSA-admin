import { FC } from 'react';
import {
  Box,
  List,
  styled,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@mui/material';
import Label from 'src/components/Label';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

interface SidebarContentProps {
  selectedId?: any;
  userList?: any;
  onClick?: any;
}

const SidebarContent: FC<SidebarContentProps> = ({
  selectedId,
  userList,
  onClick
}) => {
  return (
    <RootWrapper>
      {/* <Typography
        sx={{
          mb: 1,
          mt: 2
        }}
        variant="h3"
        textAlign={'center'}
      >
        Properties
      </Typography> */}
      <Box mt={2}>
        <List disablePadding component="div">
          {userList &&
            userList.map((user) => {
              return (
                <ListItemWrapper
                  selected={user.id == selectedId}
                  onClick={() => onClick(user)}
                >
                  <ListItemAvatar>
                    <Avatar
                      // src={user.real_name}
                      alt={user.real_name}
                      sx={{ fontSize: '1.2rem' }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      mr: 1
                    }}
                    primaryTypographyProps={{
                      color: 'textPrimary',
                      variant: 'h5',
                      noWrap: true
                    }}
                    secondaryTypographyProps={{
                      color: 'textSecondary',
                      noWrap: true
                    }}
                    primary={user.real_name}
                    // secondary={user.email}
                  />
                  <Label>{/* <b>{user.history_count}</b> */}</Label>
                </ListItemWrapper>
              );
            })}
        </List>
      </Box>
    </RootWrapper>
  );
};

export default SidebarContent;
