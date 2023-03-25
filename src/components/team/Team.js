import React from 'react'
import { useGetTeamQuery } from '../../features/team/teamApi';
import Member from './Member'

export default function Team() {
    // Use the useGetTeamQuery hook from the teamApi endpoint to fetch the data
    const { data: members, isLoading, isError, error } = useGetTeamQuery();

    let content = null;
    if (isLoading) content = <div>Loading...</div>; // Show a loading message if the data is still being fetched
    if (!isLoading && isError) content = <div>{error}</div>; // Show an error message if there was an error fetching the data
    if (!isLoading && !isError && members?.length === 0)
      content = <div>No Member Found!</div>; // Show a message if there are no members found in the fetched data
  
    if (!isLoading && !isError && members?.length > 0) {
      // If the data was fetched successfully and there are members found in the data, map through the members array and render a Member component for each member
      content = members.map((member) => (
        <Member key={member.id} member={member} />
      ));
    }
  
    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        <div className="mt-3 space-y-4">{content}</div>
      </div>
    );
}

