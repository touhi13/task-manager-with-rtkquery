import { useDispatch, useSelector } from 'react-redux';
import { filterAdded, filterRemoved } from '../../features/filter/filterSlice';

export default function ProjectItem({ project }) {
  // Access the Redux dispatch function and filter state using the useSelector hook.
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.filter);

  // Extract the project name and color class from the project prop.
  const { projectName, colorClass } = project;

  // Define a function to handle the checkbox change event.
  const handleChange = (e) => {
    // If the filter already includes the project name, dispatch the filterRemoved action.
    if (filter.includes(projectName)) {
      dispatch(filterRemoved(projectName));
    } else { // Otherwise, dispatch the filterAdded action.
      dispatch(filterAdded(projectName));
    }
  };

  // Render the project item using a checkbox and label.
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        checked={filter.includes(projectName)} // Simplify the ternary expression.
        onChange={handleChange}
      />
      <p className="label">{projectName}</p>
    </div>
  );
}

