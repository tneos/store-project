import {Skeleton} from "../ui/skeleton";

function LoadingTable({rows = 5}: {rows?: number}) {
  const tableRows = Array.from({length: rows}, (_, index) => {
    return (
      <div className="mb-4" key={index}>
        <Skeleton className="w-full h-8 rounded" />
      </div>
    );
  });
  return <div>LoadingTable</div>;
}
export default LoadingTable;
