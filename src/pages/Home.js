import React from 'react'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/sidebar/Sidebar'
import Tasks from '../components/tasks/Tasks'

export default function Home() {
  return (
    <Layout>
        <Sidebar/>
        <Tasks/>
    </Layout>
  )
}
