import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonInput));
          setResponseData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilterChange = (event) => {
        const { options } = event.target;
        const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
        setFilter(selectedOptions);
    };

    const renderData = () => {
        if (!responseData) return null;

        let dataToRender = {};
        if (filter.includes('Numbers')) dataToRender.numbers = responseData.numbers;
        if (filter.includes('Alphabets')) dataToRender.alphabets = responseData.alphabets;
        if (filter.includes('Highest lowercase alphabet')) dataToRender.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;

        return (
            <div>
                <h3>Filtered Response:</h3>
                <pre>{JSON.stringify(dataToRender, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number as Title</h1>
            <textarea 
                value={jsonInput} 
                onChange={e => setJsonInput(e.target.value)} 
                placeholder="Enter JSON" 
            />
            <button onClick={handleSubmit}>Submit</button>
            <select multiple={true} onChange={handleFilterChange}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderData()}
        </div>
    );
}

export default App;
