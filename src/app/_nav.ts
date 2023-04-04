import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
            text: ''
        }
    },
    {
        title: true,
        name: 'System Settings'
    },
    {
        name: 'Master Settings',
        url: '/master-settings',
        icon: 'icon-settings',
        children: [
            {
                name: 'Company Information',
                url: '/master-settings/company',
                icon: 'icon-notebook',
                role: 'Admin'
            },
            {
              name: 'Fiscal Year',
              url: '/master-settings/fiscal-year',
              icon: 'icon-event',
              role: 'Admin'
            },
            {
                name: 'Branch',
                url: '/master-settings/branch',
                icon: 'icon-organization',
                role: 'Admin'
            },
            {
                name: 'Department',
                url: '/master-settings/department',
                icon: 'icon-layers',
                role: 'Admin'
            },
            {
                name: 'Designation',
                url: '/master-settings/designation',
                icon: 'icon-badge',
                role: 'Admin'
            },
            {
                name: 'Wing',
                url: '/master-settings/wing',
                icon: 'icon-badge',
                role: 'Admin'
            },
            {
                name: 'Employment Type',
                url: '/master-settings/employment-type',
                icon: 'icon-grid',
                role: 'Admin'
            },
            {
                name: 'Employee',
                url: '/master-settings/employee',
                icon: 'icon-user',
                role: 'Admin'
            },
            {
                name: 'Offboarded Employee',
                url: '/master-settings/offboarded-employee',
                icon: 'icon-user',
                role: 'Admin'
            },
            {
                name: 'Leave Policy',
                url: '/master-settings/leave-policy',
                icon: 'icon-book-open',
                role: 'Admin'
            },
            {
                name: 'Balance Settings',
                url: '/master-settings/leave-balance-settings',
                icon: 'icon-chart',
                role: 'Admin'
            },
            // {
            //     name: 'Organogram',
            //     url: '/master-settings/organogram',
            //     icon: 'icon-organization',
            //     role: 'Admin,Employee,ApprovalAuthority'
            // }
        ]
    },
    {
        title: true,
        name: 'Calendar'
    },
    {
        name: 'Calendar Settings',
        url: '/calendar',
        icon: 'icon-calendar',
        children: [
            {
                name: 'Day Type Setup',
                url: '/calendar/day-type',
                icon: 'icon-settings',
                role: 'Admin'
            },
            {
                name: 'Working Day Setup',
                url: '/calendar/work-day-setup',
                icon: 'icon-settings',
                role: 'Admin'
            },
            {
                name: 'Calendar Setup',
                url: '/calendar/yearly-calendar',
                icon: 'icon-calendar',
                role: 'Admin'
            },
            {
                name: 'Academic Calendar',
                url: '/calendar/my-calendar',
                icon: 'icon-calendar',
                role: 'Admin,Employee,ApprovalAuthority'
            }
        ]
    },
    {
        title: true,
        name: 'Balance'
    },
    {
        name: 'Balance Setup',
        url: '/leave',
        icon: 'icon-layers',
        children: [
            {
                name: 'My Leave Balance',
                url: '/leave/my-leave-balance',
                icon: 'icon-wallet',
                role: 'Admin,Employee,ApprovalAuthority'
            },
            {
                name: 'Balance Setup',
                url: '/leave/employee-leave-balance',
                icon: 'icon-wallet',
                role: 'Admin'
            },
            {
                name: 'Approval Flow Setup',
                url: '/leave/approval-work-flow-setup',
                icon: 'icon-organization',
                role: 'Admin'
            }
        ]
    },
    {
        title: true,
        name: 'Leave'
    },
    {
        name: 'Leave Application',
        url: '/leave',
        icon: 'icon-directions',
        children: [
            {
                name: 'My Leave Applications',
                url: '/leave/apply-for-leave',
                icon: 'icon-share-alt',
                role: 'Admin,Employee,ApprovalAuthority',
            },
            {
                name: 'Pending for Approval',
                url: '/leave/approval-pending-leave-list',
                icon: 'icon-hourglass',
                role: 'Admin,ApprovalAuthority',
            },
            {
                name: 'Approved List',
                url: '/leave/approval-approved-leave-list',
                icon: 'icon-pin',
                role: 'Admin,ApprovalAuthority',
            }
        ]
    },
];
