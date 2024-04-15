import { Loading } from "./Loading";

interface DataLoadingManagementProps {
  data: object | null;
  error: string | null;
  render: (data: object) => React.ReactNode;
}

const ErrorSection: React.FC<{ message: string }> = ({ message }) => {
  return <div>Error: {message}</div>;
};

export const DataLoadingManagement: React.FC<DataLoadingManagementProps> = ({
  data,
  error,
  render,
}) => {
  return (
    <>
      {!error && !data && <Loading />}
      {!error && data && render(data)}
      {error && <ErrorSection message={error} />}
    </>
  );
};
