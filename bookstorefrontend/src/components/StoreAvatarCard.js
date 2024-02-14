import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const StoreAvatarCard = ({ storeName, adminName, avatarUrl }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt="Store Logo"
            src={avatarUrl}
            sx={{ width: 100, height: 100, margin: '0 auto' }} // Customize avatar size and center it
          />
        }
        title={<Typography variant="h6" align="center">{storeName}</Typography>} // Center the store name
        subheader={<Typography variant="subtitle2" align="center">{adminName}</Typography>} // Center the admin name
      />
    </Card>
  );
};

export default StoreAvatarCard;
