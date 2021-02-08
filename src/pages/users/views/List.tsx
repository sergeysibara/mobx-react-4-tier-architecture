import React, { useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from 'mobx-react-lite';
import { ControllersContext, StoresContext } from 'contexts';

const TodoList = observer(() => {
  const { userListStore } = useContext(StoresContext);
  const { userController } = useContext(ControllersContext);

  useEffect(() => {
    userController.getList();
  }, []);

  return (
    <List>
      {userListStore.list.map((item) => (
        <ListItem key={item.id} dense button>
          <ListItemText primary={item.name} />
          <ListItemText primary={item.email} />

          <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit"
              onClick={(e) => {
                e.preventDefault();
                userController.getOne(item.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={(e) => {
                e.preventDefault();
                userController.delete(item.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
});

export default TodoList;
