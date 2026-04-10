export default function MinimalApp() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333' }}>Minimal React App Working!</h1>
      <p style={{ color: '#666' }}>If you can see this, React is mounting correctly.</p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: 'white', 
        border: '1px solid #ccc',
        borderRadius: '5px'
      }}>
        <p><strong>Current time:</strong> {new Date().toLocaleString()}</p>
        <p><strong>Test:</strong> React components are rendering properly</p>
      </div>
    </div>
  );
}
