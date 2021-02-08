import React from 'react';
import EditForm from './EditForm';
import List from './List';
import Typography from '@material-ui/core/Typography';

export default function Page() {
  return (
    <>
      <Typography variant="h4">Users Page</Typography>
      <EditForm />
      <List />
    </>
  );
}
