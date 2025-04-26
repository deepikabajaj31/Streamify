const Spinner = () => {
  return (
    <div className="flex items-center w-full justify-center py-2 sm:py-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
