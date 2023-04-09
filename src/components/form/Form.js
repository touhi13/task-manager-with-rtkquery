import { useGetTeamQuery } from '../../features/team/teamApi';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import { useAddTaskMutation } from '../../features/tasks/tasksApi';
import { useEditTaskMutation } from '../../features/tasks/tasksApi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Form({ task }) {
    const { data: members, isLoading: memberIsLoading, isError: memberIsError } =
        useGetTeamQuery();

    const {
        data: projects,
        isLoading: projectIsLoading,
        isError: projectIsError,
    } = useGetProjectsQuery();

    const [addTask, { isLoading: addLoading, error: addError }] =
        useAddTaskMutation();
    const [editTask, { isLoading: editLoading, error: editError }] =
        useEditTaskMutation();

    const navigate = useNavigate();

    const [taskName, setTaskName] = useState('');
    const [teamMember, setTeamMember] = useState({});
    const [project, setProject] = useState({});
    const [deadline, setDeadline] = useState('');
    const [editMode, setEditMode] = useState(false);

    const status = 'pending';
    const { taskName: oldName, teamMember: oldTeamMember, project: oldProject, deadline: oldDeadline, id } = task || {};

    useEffect(() => {
        if (id) {
            setEditMode(true);
            setTaskName(oldName);
            setTeamMember(oldTeamMember);
            setProject(oldProject);
            setDeadline(oldDeadline);
        } else {
            setEditMode(false);
        }
    }, [id, oldName, oldTeamMember, oldProject, oldDeadline]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addTask({ taskName, teamMember, project, deadline, status });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await editTask({
                id,
                data: { taskName, teamMember, project, deadline },
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        }

    };

    if (memberIsLoading || projectIsLoading) {
        return <div>Loading...</div>;
    }

    if (memberIsError || projectIsError) {
        return <div>Error fetching data</div>;
    }
    console.log(task)
    return (
        <>

            {addLoading || editLoading ? (
                <div>Loading...</div>
            ) : (
                <form className="space-y-6" onSubmit={editMode ? handleUpdate : handleSubmit}>
                    <div className="fieldContainer">
                        <label htmlFor="lws-taskName">Task Name</label>
                        <input
                            type="text"
                            id="lws-taskName"
                            name="taskName"
                            placeholder="Implement RTK Query"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="lws-teamMember">Assign to</label>
                        <select
                            id="lws-teamMember"
                            name="teamMember"
                            defaulValue={teamMember.id}
                            onChange={(e) =>
                                setTeamMember(
                                    members.find((member) => member.id === parseInt(e.target.value))
                                )
                            }
                        >
                            <option value="">Select a team member</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id} selected={member.id === teamMember.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="lws-projectName">Project Name</label>
                        <select
                            id="lws-projectName"
                            name="projectName"
                            defaultValue={project.id}
                            onChange={(e) =>
                                setProject(
                                    projects.find(
                                        (project) => project.id === parseInt(e.target.value)
                                    )
                                )
                            }                        >
                            <option value="">Select a project</option>
                            {projects.map((projectItem) => (
                                <option key={projectItem.id} value={projectItem.id} selected={projectItem.id === project.id}>
                                    {projectItem.projectName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="lws-deadline">Deadline</label>
                        <input
                            type="date"
                            id="lws-deadline"
                            name="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <div className="text-right">
                        <button disabled={addLoading || editLoading} type="submit" className="lws-submit">{editMode ? 'Update' : 'Save'}</button>
                    </div>
                </form>
            )}
        </>
    );
}

