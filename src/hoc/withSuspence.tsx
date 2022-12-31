import React from "react";
import Preloader from "../components/common/Preloader/Preloader";

function withSuspence<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>){
    return (props: WCP) => {
      return <React.Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  }
} 
export default withSuspence