import Swal from "sweetalert2";

const AdminWarning = ({username, forbiddenAction}) => {
    Swal.fire({
        title: 'Oops!',
        html:
            `
            <p>Not so fast, <span style='font-weight: 700; color: var(--blue3);'>@${username}</span>!</p>
            <p>Only non-admin users<br>can ${forbiddenAction}. 😁</p>
            `,
        icon: 'warning',
        confirmButtonText: 'OK',
    });
};

const NonAdminWarning = ({username, forbiddenAction}) => {
    Swal.fire({
        title: 'Oops!',
        html:
            `
            <p>Not so fast, <span style='font-weight: 700; color: var(--blue3);'>@${username}</span>!</p>
            <p>Only admin users<br>can ${forbiddenAction}. 😁</p>
            `,
        icon: 'warning',
        confirmButtonText: 'OK',
    });
};

const UnauthenticatedWarning = ({forbiddenAction}) => {
    Swal.fire({
        title: 'Oops!',
        html: 
        `
        <p style='margin: 0;'>In order to ${forbiddenAction},</p>
        <p>You must login first my friend! 😁</p>
        `,
        icon: 'warning',
        confirmButtonText: 'OK',
    });
};
 
export { AdminWarning, NonAdminWarning, UnauthenticatedWarning };