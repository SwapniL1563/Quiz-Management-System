export const Card = ({ children, className }) => {
    return <div className={`bg-white  md:m-0 p-3 md:p-4   rounded-lg shadow-md ${className}`}>{children}</div>;
  };
  
  export const CardHeader = ({ children }) => <div className="mb-2 text-[#30B2AD]">{children}</div>;
  
  export const CardTitle = ({ children }) => <h2 className="text-lg  font-semibold ">{children}</h2>;
  
  export const CardContent = ({ children }) => <div>{children}</div>;
  