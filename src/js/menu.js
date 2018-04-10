//https://gist.github.com/davidgljay/5d7a29c5add8b360b93db838235e80a8
// to set icons and apps

export const Nav_menu_json = [
    {
        "text": "Flows",
        "title": "Flows",
        "nav_id": "tab-FlowTable",
        "active": "active",
        "icon":{
            "name":"sitemap",
            "path":"react-icons-kit/fa/sitemap"
        }  
    },
    {
        "text": "Number Flow Map",
        "title": "Number Flow Map",
        "nav_id": "tab-NumberFlowMap",
        "icon":{
            "name":"ic_business_center",
            "path":"react-icons-kit/md/ic_business_center"
        }
    },
    {
        "text": "Scheduling",
        "title": "Scheduling",
        "nav_id": "tab-Scheduling",
        "icon":{
            "name":"calendar",
            "path":"react-icons-kit/fa/calendar"
        },
        "menu": [{
            "text": "Schedule Groups",
            "title": "Schedule Groups",
            "nav_id": "tab-ScheduleGroup"
        },
        {
            "text": "Schedules",
            "title": "Schedules",
            "nav_id": "tab-Schedules"
        },
        {
            "text": "Tasks",
            "title": "Tasks",
            "nav_id": "tab-Tasks"
        }]
    },
    {
        "text": "External Data",
        "title": "External Data",
        "nav_id": "tab-ExternalData",
        "menu": [{
            "text": "Connections",
            "title": "Connections",
            "nav_id": "tab-Connections"
        },
        {
            "text": "Queries",
            "title": "Queries",
            "nav_id": "tab-Query"
        }]
    },
    {
        "text": "Tags",
        "title": "Tags",
        "nav_id": "tab-Tags"
    },
    {
        "text": "Waypoints",
        "title": "Waypoints",
        "nav_id": "tab-Waypoints"
    },
    {
        "text": "Queues",
        "title": "Queues",
        "nav_id": "tab-QueuesTab"
    },
    {
        "text": "Sites",
        "title": "Sites",
        "nav_id": "tab-SitesTab"
    },
    {
        "text": "Meta",
        "title": "Meta",
        "nav_id": "tab-Meta",
        "menu": [{
            "text": "Data",
            "title": "Data",
            "nav_id": "tab-Metadata"
        },
        {
            "text": "Templates",
            "title": "Templates",
            "nav_id": "tab-MetaTemplates"
        },
        {
            "text": "Profiles",
            "title": "Profiles",
            "nav_id": "tab-MetaProfiles"
        },
        {
            "text": "Form Builder",
            "title": "Form Builder",
            "nav_id": "tab-formBuilder"
        }]
    },
    {
        "text": "Resource Manager",
        "title": "Resource Manager",
        "nav_id": "tab-ResourceManager"
    },
    {
        "text": "Users",
        "title": "Users",
        "nav_id": "tab-Users"
    }
];

