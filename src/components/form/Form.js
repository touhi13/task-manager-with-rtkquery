import { useGetTeamQuery } from '../../features/team/teamApi';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import { useAddTaskMutation } from '../../features/tasks/tasksApi';
import { useEditTaskMutation } from '../../features/tasks/tasksApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Form() {
    const {
        data: members,
        isLoading: memberIsLoading,
        isError: memberIsError,
    } = useGetTeamQuery();

    const {
        data: projects,
        isLoading: projectIsLoading,
        isError: projectIsError,
    } = useGetProjectsQuery();

    const [addTask, { isLoading }] = useAddTaskMutation();
    const [editTask, {load: isLoading }] = useEditTaskMutation();
    const navigate = useNavigate();

    const [taskName, setTaskName] = useState('');
    const [teamMember, setTeamMember] = useState({});
    const [project, setProject] = useState({});
    const [deadline, setDeadline] = useState('');

    const status = 'pending';

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ taskName, teamMember, project, deadline, status });

        navigate('/');
    };
    return (
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                    type="text"
                    name="taskName"
                    id="lws-taskName"
                    required
                    placeholder="Implement RTK Query"
                    onChange={(e) => setTaskName(e.target.value)}

                />
            </div>

            <div className="fieldContainer">
                <label>Assign To</label>
                <select name="teamMember" id="lws-teamMember" required onChange={(e) =>
                    setTeamMember(
                        members.find((member) => member.name === e.target.value)
                    )
                }>
                    <option value="" hidden selected>Select Job</option>

                    {!memberIsLoading &&
                        !memberIsError &&
                        members.map((member) => <option>{member.name}</option>)}
                </select>
            </div>
            <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select
                    id="lws-projectName"
                    name="projectName"
                    required
                    onChange={(e) =>
                        setProject(
                            projects.find(
                                (project) => project.projectName === e.target.value
                            )
                        )
                    }
                >
                    <option value="" hidden selected>
                        Select Project
                    </option>
                    {!projectIsLoading &&
                        !projectIsError &&
                        projects.map((project) => (
                            <option>{project.projectName}</option>
                        ))}
                </select>
            </div>

            <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input type="date" name="deadline" id="lws-deadline" required onChange={(e) => setDeadline(e.target.value)} />
            </div>

            <div className="text-right">
                <button type="submit" className="lws-submit">Save</button>
            </div>
        </form>
    )
}
