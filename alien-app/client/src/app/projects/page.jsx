"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import ProjectList from "./_components/ProjectList";
import AddProject from "./_components/AddProject";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            try {
                const response = await axios.get(
                    "https://6569640ede53105b0dd6f973.mockapi.io/projects"
                );
                setProjects(response.data);
            } catch (error) {
                console.log("getProjects failed", error.message);
            }
        }
        getProjects();
    }, []);
    return (
        <div className="px-6 mt-20">
            <h1 className="text-center text-xl font-bold text-gray-500 m-3 ">
                Projects
            </h1>
            <AddProject projects={projects} setProjects={setProjects} />

            {projects.length ? <ProjectList projects={projects} /> : "Loading"}
        </div>
    );
}

export default Projects;
