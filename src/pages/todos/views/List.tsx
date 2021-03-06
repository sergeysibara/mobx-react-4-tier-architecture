import { useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from 'mobx-react-lite';
import { ControllersContext, StoresContext } from 'contexts';
import { ITodoModel } from '../stores';

const TodoList = observer(() => {
  const { todoListStore } = useContext(StoresContext);
  const { todoController } = useContext(ControllersContext);

  const handleChange = (item) => {
    todoController.update({
      id: item.id,
      completed: !item.completed,
    } as ITodoModel);
  };

  useEffect(() => {
    todoController.getList();
  }, []);

  return (
    <List>
      {todoListStore.list.map((item) => (
        <ListItem key={item.id} dense button>
          <Checkbox
            tabIndex={-1}
            disableRipple
            onChange={() => {
              handleChange(item);
            }}
            checked={item.completed || false}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
          <ListItemText primary={item.title} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit"
              onClick={(e) => {
                e.preventDefault();
                todoController.getOne(item.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={(e) => {
                e.preventDefault();
                todoController.delete(item.id);
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
