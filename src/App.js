import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import Chats from './components/chats';
import AddChat from './components/addChat';
import ChatWindow from './components/chatWindow';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/chats' element={<Chats/>}/>
          <Route path='/addChat' element={<AddChat/>}/>
          {/* <Route path='/chatwindow' element={<ChatWindow/>}/> */}
        </Routes>

      </BrowserRouter>
  );
}

export default App;
