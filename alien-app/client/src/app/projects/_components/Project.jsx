import { useRouter } from 'next/navigation'
import {Link} from 'next/link'

function Project({ project }) {
    const router = useRouter()
    return (
            <tr 
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            onClick={()=>router.push(`/projects/${project.id}`)}
            >

                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {project.name}
                </th>
                <td className="px-6 py-4 text-center">{project.done ? "Done": "In progress"}</td>
                <td className="px-4 py-4 text-center">{project.quantityOfTasks}</td>
                <td className="px-4 py-4 text-center">{project.quantityOfMembers}</td>
                <td className="px-6 py-4 text-center">{project.author}</td>
            </tr>
    );
}

export default Project;
