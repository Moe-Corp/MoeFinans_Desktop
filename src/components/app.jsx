import { useState } from 'preact/hooks';
import { invoke } from '@tauri-apps/api/tauri';

const GreetingComponent = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await invoke('greet', { name });
      setGreeting(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {greeting && <h2>{greeting}</h2>}
    </div>
  );
};

export default GreetingComponent;
