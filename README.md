Formify AI
==========

Formify AI is a powerful and user-friendly application that allows you to create customized forms effortlessly. Powered by artificial intelligence, this Next.js application leverages the Gemini AI API to generate form fields based on your prompts. With features like secure authentication, responsive design, and persistent data storage, Formify AI streamlines the form creation process while providing a seamless user experience. You can create any type of form, customize every field, and design the form to match your theme preferences.

Features
--------

-   **AI-Powered Form Creation**: Users can create forms by simply providing prompts, and the AI generates the necessary form fields based on the prompts. Formify AI supports a vast variety of form types, allowing for full customization of every field.

-   **User Panel**: A dedicated user panel enables users to create and manage forms. Users can share form links anywhere and enable or disable authentication for form submissions as needed.

-   **Authentication**: Next-auth is integrated for secure authentication, allowing users to sign up, sign in, and manage their accounts. Users can choose whether to require authentication for form submission or allow anonymous responses.

-   **Form Data Export**: Formify AI provides the ability to export form data easily in Excel format, making data management seamless.

-   **Responsive Design:** Shadcn UI ensures that the application is responsive and looks great across various devices and screen sizes.

-   **Admin Dashboard**: Admin users have access to a dashboard where they can view all responses submitted to their forms and manage user submissions.

-   **Persistent Data Storage**: PostgreSQL is used as the database to store form configurations, user information, and form responses securely.

-   **Theme Customization**: The app offers six different themes for users to choose from, allowing them to customize the appearance of their app interface.

-   **Form Sharing**: Users can easily share forms with others via a generated link and control access to forms using built-in authentication options.

Technologies Used
-----------------

-   **Next.js**: A React framework for building server-side rendered (SSR) and statically generated web applications.
-   **Next-auth**: A complete open-source authentication solution for Next.js applications.
-   **Shadcn UI**: A UI framework for building beautiful, responsive web interfaces.
-   **Gemini AI API**: An API for integrating artificial intelligence capabilities into applications.
-   **Drizzle ORM**: ORM used for object-relational mapping, simplifying database interactions and management.
-   **PostgreSQL**: A powerful, open-source relational database system.
-   **DaisyUI:** A lightweight utility-first CSS component library for Tailwind CSS.

Get Started
-----------

1.  **Clone the repository:**

    bash

    Copy code

    `git clone https://github.com/WonderSTK/Formify_AI`

2.  **Install Dependencies:**

    bash

    Copy code

    `cd your_repo
    npm install`

3.  **Set Up Environment Variables:**

    bash

    Copy code

     `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=
     NEXT_PUBLIC_DATABASE_URL_CONFIG=
     NEXT_PUBLIC_GEMINI_API_KEY=
     NEXT_PUBLIC_BASE_URL=`

4.  **Run the Application:**

    bash

    Copy code

    `npm run dev`

Future Enhancements
-------------------

-   **Advanced Form Analytics**: Gain insights into form performance and submission trends.
-   **Enhanced Form Customization**: Add conditional logic and dynamic form fields to improve form interactions.
-   **Collaboration Features**: Allow multiple users to collaborate on form creation and management in real time.