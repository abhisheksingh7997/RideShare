
export function Button({ children, onClick, className = '', type = 'button' }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-600 hover:bg-blue-300 text-black font-semibold px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
}
