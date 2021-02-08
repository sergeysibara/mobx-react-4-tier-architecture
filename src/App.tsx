import TodoPage from './pages/todos/views/Page';
import UserPage from './pages/users/views/Page';
import { ToastContainer } from 'react-toastify';
import {
  initContextsValues,
  StoresContext,
  ControllersContext,
} from './contexts';

const contexts = initContextsValues();

const App = () => {
  return (
    <div className="App">
      <StoresContext.Provider value={contexts.stores}>
        <ControllersContext.Provider value={contexts.controllers}>
          <TodoPage />
          <UserPage />
        </ControllersContext.Provider>
      </StoresContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
