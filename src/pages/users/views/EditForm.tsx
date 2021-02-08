import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import useInputBind from 'components/controls/useInputBind';
import { observer } from 'mobx-react-lite';
import { ControllersContext, StoresContext } from 'contexts';
import { IUserModel } from '../stores';

const EditForm = observer(() => {
  const { userEditStore } = useContext(StoresContext);
  const { userController } = useContext(ControllersContext);

  const userModel = userEditStore?.editModel;
  const isNew = !userModel;

  const [todoText, setUserName, userNameBind] = useInputBind(
    userModel ? userModel.name : '',
  );

  useEffect(() => {
    if (userModel) {
      setUserName(userModel.name);
    }
  }, [userModel, setUserName]);

  const saveTodo = (todoText) => {
    const trimmedText = todoText.trim();

    if (trimmedText.length > 0) {
      if (userModel) {
        userController.update({
          ...userModel,
          name: trimmedText,
        } as IUserModel);
        userController.clearEditState();
      } else {
        userController.create({ name: trimmedText });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveTodo(todoText);
    setUserName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        placeholder={`${isNew ? 'add' : 'edit'} user name`}
        label={`Press Enter for ${isNew ? 'add' : 'edit'} name`}
        margin="normal"
        {...userNameBind}
      />
    </form>
  );
});

export default EditForm;
