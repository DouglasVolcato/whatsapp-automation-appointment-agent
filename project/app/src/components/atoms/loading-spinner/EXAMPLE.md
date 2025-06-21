```tsx
import { LoadingSpinner } from "./components/atoms/loading-spinner/loading-spinner";

export const App = () => {
  return (
    <>
      <div className="border-3 w-12rem h-12rem flex justify-content-center align-items-center text-white text-4xl">
        <LoadingSpinner loading={true} />
      </div>
      <div className="border-3 w-24rem h-20rem flex justify-content-center align-items-center text-white text-4xl">
        <LoadingSpinner loading={true} />
      </div>
      <div className="border-3 w-50rem h-30rem flex justify-content-center align-items-center text-white text-4xl">
        <LoadingSpinner loading={true} />
      </div>
    </>
  );
};

```