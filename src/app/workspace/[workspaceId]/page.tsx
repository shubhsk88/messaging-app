interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = (props: WorkspaceIdPageProps) => {
  return (
    <div>
      <h1>Workspace ID: {props.params.workspaceId}</h1>
    </div>
  );
};

export default WorkspaceIdPage;
