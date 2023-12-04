import Project from "./Project";
function ProjectList({ projects }) {
    return (
        
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Project name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                State
                            </th>
                            <th scope="col" className="px-4 py-3 text-center">
                                Task
                            </th>
                            <th scope="col" className="px-4 py-3 text-center">
                                Member
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Author
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <Project project={project} key={project.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        
    );
}

export default ProjectList;
