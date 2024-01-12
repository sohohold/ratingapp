const Loading = () => {
  return (
    <div className="grid gap-4 w-full max-w-lg">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white shadow-md rounded-md p-4 w-full">
          <div className="animate-pulse h-5 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="animate-pulse h-4 bg-gray-300 rounded w-1/2 mb-2" />
        </div>
      ))}
    </div>
  );
}

export default Loading;