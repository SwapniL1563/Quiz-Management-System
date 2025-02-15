export const Button = ({ className, ...props }) => {
    return (
      <button
        className={`px-4 py-2  text-white rounded-md hover:bg-[#2b9894] ${className}`}
        {...props}
      />
    );
  };
  