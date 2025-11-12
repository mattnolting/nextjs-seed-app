import type { AppData } from "./types";

export const demoData: AppData = {
  cardView: {
    items: [
      {
        id: "1",
        title: "Project Alpha",
        description:
          "Enterprise project management solution with advanced collaboration features and real-time updates.",
        icon: "code-branch",
        meta: {
          Status: "Active",
          Category: "Development",
        },
      },
      {
        id: "2",
        title: "Project Beta",
        description:
          "Customer relationship management platform designed to streamline sales processes and improve customer engagement.",
        icon: "dollar-sign",
        meta: {
          Status: "Active",
          Category: "Sales",
        },
      },
      {
        id: "3",
        title: "Project Gamma",
        description:
          "Data analytics and reporting tool that provides comprehensive insights into business performance metrics.",
        icon: "chart-line",
        meta: {
          Status: "Inactive",
          Category: "Analytics",
        },
      },
      {
        id: "4",
        title: "Project Delta",
        description:
          "Marketing automation system that enables personalized campaigns and tracks customer journey across channels.",
        icon: "bullhorn",
        meta: {
          Status: "Active",
          Category: "Marketing",
        },
      },
      {
        id: "5",
        title: "Project Epsilon",
        description:
          "Supply chain management solution for optimizing logistics, inventory, and distribution networks.",
        icon: "warehouse",
        meta: {
          Status: "Active",
          Category: "Operations",
        },
      },
      {
        id: "6",
        title: "Project Zeta",
        description:
          "HR management platform for employee lifecycle management, payroll, and benefits administration.",
        icon: "users",
        meta: {
          Status: "Inactive",
          Category: "HR",
        },
      },
      {
        id: "7",
        title: "Project Eta",
        description:
          "Financial planning and analysis tool with advanced forecasting capabilities and budget management.",
        icon: "calculator",
        meta: {
          Status: "Active",
          Category: "Finance",
        },
      },
      {
        id: "8",
        title: "Project Theta",
        description:
          "IT service management platform for incident management, change control, and service desk operations.",
        icon: "server",
        meta: {
          Status: "Active",
          Category: "IT",
        },
      },
      {
        id: "9",
        title: "Project Iota",
        description:
          "Quality assurance and testing framework for automated testing, bug tracking, and test case management.",
        icon: "check-circle",
        meta: {
          Status: "Inactive",
          Category: "QA",
        },
      },
      {
        id: "10",
        title: "Project Kappa",
        description:
          "Security and compliance monitoring system for threat detection, vulnerability assessment, and audit reporting.",
        icon: "shield-alt",
        meta: {
          Status: "Active",
          Category: "Security",
        },
      },
      {
        id: "11",
        title: "Project Lambda",
        description:
          "Content management system with multi-site support, workflow automation, and digital asset management.",
        icon: "database",
        meta: {
          Status: "Active",
          Category: "Development",
        },
      },
      {
        id: "12",
        title: "Project Mu",
        description:
          "E-commerce platform with shopping cart, payment processing, and order fulfillment capabilities.",
        icon: "shopping-cart",
        meta: {
          Status: "Active",
          Category: "Sales",
        },
      },
      {
        id: "13",
        title: "Project Nu",
        description:
          "Business intelligence dashboard with interactive visualizations and real-time data synchronization.",
        icon: "database",
        meta: {
          Status: "Inactive",
          Category: "Analytics",
        },
      },
      {
        id: "14",
        title: "Project Xi",
        description:
          "Social media management tool for scheduling posts, monitoring engagement, and analyzing campaign performance.",
        icon: "envelope",
        meta: {
          Status: "Active",
          Category: "Marketing",
        },
      },
      {
        id: "15",
        title: "Project Omicron",
        description:
          "Warehouse management system for inventory tracking, order picking, and shipping coordination.",
        icon: "truck",
        meta: {
          Status: "Active",
          Category: "Operations",
        },
      },
    ],
    filters: {
      categories: {
        Status: ["Active", "Inactive"],
        Category: [
          "Development",
          "Sales",
          "Analytics",
          "Marketing",
          "Operations",
          "HR",
          "Finance",
          "IT",
          "QA",
          "Security",
        ],
      },
    },
  },
  tableView: {
    columns: ["Name", "Email", "Role", "Status"],
    rows: [
      { id: 1, cells: ["John Doe", "john.doe@example.com", "Admin", "Active"] },
      {
        id: 2,
        cells: ["Jane Smith", "jane.smith@example.com", "User", "Active"],
      },
      {
        id: 3,
        cells: ["Bob Johnson", "bob.johnson@example.com", "Guest", "Inactive"],
      },
      {
        id: 4,
        cells: [
          "Alice Williams",
          "alice.williams@example.com",
          "User",
          "Active",
        ],
      },
      {
        id: 5,
        cells: ["Charlie Brown", "charlie.brown@example.com", "User", "Active"],
      },
      {
        id: 6,
        cells: ["Diana Prince", "diana.prince@example.com", "Admin", "Active"],
      },
      {
        id: 7,
        cells: ["Eve Adams", "eve.adams@example.com", "Guest", "Inactive"],
      },
      {
        id: 8,
        cells: ["Frank Miller", "frank.miller@example.com", "User", "Active"],
      },
      {
        id: 9,
        cells: ["Grace Lee", "grace.lee@example.com", "User", "Active"],
      },
      {
        id: 10,
        cells: [
          "Henry Taylor",
          "henry.taylor@example.com",
          "Guest",
          "Inactive",
        ],
      },
      {
        id: 11,
        cells: ["Iris Martinez", "iris.martinez@example.com", "User", "Active"],
      },
      {
        id: 12,
        cells: ["Jack Wilson", "jack.wilson@example.com", "Admin", "Active"],
      },
      {
        id: 13,
        cells: ["Kate Davis", "kate.davis@example.com", "User", "Active"],
      },
      {
        id: 14,
        cells: [
          "Liam Anderson",
          "liam.anderson@example.com",
          "Guest",
          "Inactive",
        ],
      },
      {
        id: 15,
        cells: ["Mia Thompson", "mia.thompson@example.com", "User", "Active"],
      },
      {
        id: 16,
        cells: ["Noah Garcia", "noah.garcia@example.com", "User", "Active"],
      },
      {
        id: 17,
        cells: [
          "Olivia Rodriguez",
          "olivia.rodriguez@example.com",
          "User",
          "Active",
        ],
      },
      {
        id: 18,
        cells: ["Paul Lewis", "paul.lewis@example.com", "Guest", "Inactive"],
      },
      {
        id: 19,
        cells: ["Quinn Walker", "quinn.walker@example.com", "User", "Active"],
      },
      {
        id: 20,
        cells: ["Rachel Hall", "rachel.hall@example.com", "Admin", "Active"],
      },
      {
        id: 21,
        cells: ["Sam Young", "sam.young@example.com", "User", "Active"],
      },
      {
        id: 22,
        cells: ["Tina King", "tina.king@example.com", "User", "Active"],
      },
      {
        id: 23,
        cells: ["Uma Wright", "uma.wright@example.com", "Guest", "Inactive"],
      },
      {
        id: 24,
        cells: ["Victor Lopez", "victor.lopez@example.com", "User", "Active"],
      },
      {
        id: 25,
        cells: ["Wendy Hill", "wendy.hill@example.com", "User", "Active"],
      },
    ],
    filters: {
      categories: {
        Role: ["Admin", "User", "Guest"],
        Status: ["Active", "Inactive"],
      },
    },
  },
  primaryDetail: {
    primaryItems: [
      {
        id: "1",
        title: "Project Alpha",
        description: "Enterprise project management solution",
        meta: {
          status: "Active",
          owner: "John Doe",
          lastUpdated: "2024-01-15",
        },
      },
      {
        id: "2",
        title: "Project Beta",
        description: "Customer relationship management platform",
        meta: {
          status: "Active",
          owner: "Jane Smith",
          lastUpdated: "2024-01-14",
        },
      },
      {
        id: "3",
        title: "Project Gamma",
        description: "Data analytics and reporting tool",
        meta: {
          status: "Inactive",
          owner: "Bob Johnson",
          lastUpdated: "2024-01-10",
        },
      },
      {
        id: "4",
        title: "Project Delta",
        description: "Marketing automation system",
        meta: {
          status: "Active",
          owner: "Alice Williams",
          lastUpdated: "2024-01-16",
        },
      },
      {
        id: "5",
        title: "Project Epsilon",
        description: "Supply chain management solution",
        meta: {
          status: "Active",
          owner: "Charlie Brown",
          lastUpdated: "2024-01-13",
        },
      },
    ],
  },
  formView: {
    fields: [
      {
        name: "fullName",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        validation: {
          required: true,
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        },
      },
      {
        name: "title",
        label: "Your title",
        type: "select",
        options: [
          { value: "", label: "Select one" },
          { value: "Mr", label: "Mr" },
          { value: "Miss", label: "Miss" },
          { value: "Mrs", label: "Mrs" },
          { value: "Ms", label: "Ms" },
          { value: "Dr", label: "Dr" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "experience",
        label: "Your experience",
        type: "select",
        options: [
          { value: "", label: "Select one" },
          { value: "Beginner", label: "Beginner" },
          { value: "Intermediate", label: "Intermediate" },
          { value: "Advanced", label: "Advanced" },
        ],
      },
      {
        name: "contactMethod",
        label: "How can we contact you?",
        type: "checkbox",
        options: [
          { value: "Email", label: "Email" },
          { value: "Phone", label: "Phone" },
          { value: "Mail", label: "Mail" },
        ],
      },
      {
        name: "timeZone",
        label: "Time zone",
        type: "select",
        options: [
          { value: "Eastern", label: "Eastern" },
          { value: "Central", label: "Central" },
          { value: "Pacific", label: "Pacific" },
        ],
      },
      {
        name: "additionalNote",
        label: "Additional note",
        type: "textarea",
        placeholder: "Enter any additional information",
        validation: {
          maxLength: 500,
        },
      },
    ],
    validation: {
      fullName: {
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      email: {
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      },
      additionalNote: {
        maxLength: 500,
      },
    },
  },
};
