import TodoItem from './components/TodoItem';

function App() {
  return (
    <div className="h-screen bg-neutral-900">
      <TodoItem title={'Sample Title'} description={'Sample Description'} />
    </div>
  );
}

export default App;
