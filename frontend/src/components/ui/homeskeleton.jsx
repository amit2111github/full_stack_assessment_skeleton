const HomeSkeleton = () => {
  let arr = [];
  for (let i = 1; i <= 20; i++) {
    arr.push(i);
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-2 gap-4">
      {arr.map((index) => (
        <div key={index}>
          <div className="h-auto bg-white border border-gray-100 shadow-lg content-start">
            <div className="w-full h-auto flex flex-row justify-start items-center">
              {/* house adress */}
              <p className="text-xl font-medium px-4 py-2"></p>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start text-md px-4 my-1">
              {/* other details */}
              <p className="w-full h-10 bg-gray-300 animate-pulse"></p>
              <p className="w-full h-4 bg-gray-300 my-2 animate-pulse"></p>
              <p className="w-full h-4 bg-gray-300 my-2 animate-pulse"></p>
              <p className="w-full h-4 bg-gray-300 my-2 animate-pulse"></p>
              <p className="w-full h-4 bg-gray-300 my-2 animate-pulse"></p>
              <p className="w-full h-4 bg-gray-300 my-2 animate-pulse"></p>
            </div>
            <div className="w-full h-16 flex flex-row justify-start items-center my-1">
              {/* dummy  edit button  */}
              <button className="animate-pulse w-28 h-10 bg-blue-500 rounded-md text-white font-medium flex flex-row justify-center items-center px-6 py-2 mx-4 hover:bg-blue-600"></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;
