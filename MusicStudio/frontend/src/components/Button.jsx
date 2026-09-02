export default function Button({ children, onClick, style }) {
  return (
    <button
      class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded cursor-pointer ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
