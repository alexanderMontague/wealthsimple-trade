import React from 'react'
import { Redirect } from 'react-router-dom'

// Layout Types
import { DefaultLayout } from '../layouts'

// Route Views
import Holdings from '../views/Holdings'
import BlogOverview from '../views/BlogOverview'
import UserProfile from '../views/UserProfile'
import AddNewPost from '../views/AddNewPost'
import Errors from '../views/Errors'
import ComponentsOverview from '../views/ComponentsOverview'
import Tables from '../views/Tables'
import BlogPosts from '../views/BlogPosts'
import Watchlists from '../views/Watchlists'

export default [
    {
        path: '/',
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/holdings" />,
    },
    {
        path: '/holdings',
        layout: DefaultLayout,
        component: Holdings,
        exact: true,
    },
    {
        path: '/trade',
        layout: DefaultLayout,
        component: BlogOverview,
        exact: true,
    },
    {
        path: '/watchlist',
        layout: DefaultLayout,
        component: Watchlists,
        exact: true,
    },
    {
        path: '/alerts',
        layout: DefaultLayout,
        component: BlogOverview,
        exact: true,
    },
    {
        path: '/user-profile',
        layout: DefaultLayout,
        component: UserProfile,
        exact: true,
    },
    {
        path: '/add-new-post',
        layout: DefaultLayout,
        component: AddNewPost,
        exact: true,
    },
    {
        path: '/errors',
        layout: DefaultLayout,
        component: Errors,
        exact: true,
    },
    {
        path: '/components-overview',
        layout: DefaultLayout,
        component: ComponentsOverview,
        exact: true,
    },
    {
        path: '/tables',
        layout: DefaultLayout,
        component: Tables,
        exact: true,
    },
    {
        path: '/blog-posts',
        layout: DefaultLayout,
        component: BlogPosts,
        exact: true,
    },
]
