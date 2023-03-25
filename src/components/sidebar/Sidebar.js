import React from 'react'
import ProjectList from '../projects/ProjectList'
import Team from '../team/Team'

export default function Sidebar() {
    return (
        <div className="sidebar">
            {/* <!-- Projects List --> */}
            <ProjectList />

            {/* <!-- Team Members --> */}
            <Team />
        </div>
    )
}
