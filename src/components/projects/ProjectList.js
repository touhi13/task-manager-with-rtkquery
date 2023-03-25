import { useDispatch } from 'react-redux';
import ProjectItem from './ProjectItem';
import { useEffect } from 'react';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import { filterInitialized } from '../../features/filter/filterSlice';

export default function ProjectList() {
    // Calling the useGetProjectsQuery hook from RTK Query to fetch the list of projects.
    const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

    // Creating an instance of the dispatch function to dispatch the filterInitialized action.
    const dispatch = useDispatch();

    // Using the useEffect hook to dispatch the filterInitialized action when the projects state is updated.
    useEffect(() => {
        if (projects?.length > 0) {
            dispatch(filterInitialized(projects));
        }
    }, [dispatch, projects]);

    // Defining the content to be displayed based on the state of the component.
    let content = null;
    if (isLoading) {
        content = <div>Loading...</div>;
    }
    if (!isLoading && isError) {
        content = <div>{error}</div>;
    }
    if (!isLoading && !isError && projects?.length === 0) {
        content = <div>No Projects Found!</div>;
    }
    if (!isLoading && !isError && projects?.length > 0) {
        content = projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
        ));
    }

    // Rendering the list of projects.
    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">{content}</div>
        </div>
    );

}
