const App = () => {
    const sendRequest = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users');
            const data = await res.json();
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return (
        <>
            <h1>Hello World!</h1>
            <button onClick={sendRequest}>Send Request</button>
        </>
    )
}

export default App;
