
import { FC } from "react";

export const Container:FC<any> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

export default Container;