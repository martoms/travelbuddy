import { useState, useEffect, useContext } from "react";
import { AllContext } from "../context/AllContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const useHandleSubmit = (formData, initialFormState, setFormData) => {

    const [isPending, setIsPending] = useState(true);
    

    // For Bookings
    const [buddiesCount, setBuddiesCount] = useState(0);
    // For Signup/Login Error Selectors
    const [usernameErr, setUsernameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [confirmPassworderr, setConfirmPassworderr] = useState('')

    // For Change Password Error Selector
    const [currentPassworderr, setCurrentPassworderr] = useState('')
    const [newPassworderr, setNewPassworderr] = useState('')
    const [confirmNewPassworderr, setConfirmNewPassworderr] = useState('')

    
    // const token = localStorage.getItem('token');
    const { user, token } = useContext(AllContext);
    const navigate = useNavigate()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setUsernameErr(document.querySelector('.username-error'));
        setEmailErr(document.querySelector('.email-error'));
        setPasswordErr(document.querySelector('.password-error'));
        setConfirmPassworderr(document.querySelector('.confirmPassword-error'));
        setCurrentPassworderr(document.querySelector('.currentPassword-error'));
        setNewPassworderr(document.querySelector('.newPassword-error'));
        setConfirmNewPassworderr(document.querySelector('.confirmNewPassword-error'));
    })

    // Create Tour Package
    const createTourPackage = async (e) => {

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/users/admin/tourpackages/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            setFormData(initialFormState);
            if (data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (!data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: data.message,
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    };

    // Update Tour Package
    const updateTourPackage = async (e, id, setEdit) => {

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/users/admin/${id}/update-tour-package`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            setEdit(false);
            if (data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (!data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Tour Package was updated!',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    
    };

    // Change Password
    const changePassword = async (e, isAdmin) => {

        // Reset Errors
        currentPassworderr.textContent = '';
        newPassworderr.textContent = '';
        confirmNewPassworderr.textContent = '';

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(
                isAdmin ?
                `${process.env.REACT_APP_API_URL}/users/admin/change-password`
                :
                `${process.env.REACT_APP_API_URL}/users/profile/change-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            
            setIsPending(false);
            
            if (data.error) {
                if(
                    data.error[0] &&
                    data.error !== 'Invalid current password.'
                ) {
                    confirmNewPassworderr.textContent = data.error[0]
                    Swal.fire({
                        title: 'Failed',
                        icon: 'error',
                        text: data.error[0]
                    });
                } else if (
                    data.error === 'Invalid current password.'
                ) {
                    currentPassworderr.textContent = data.error;
                    Swal.fire({
                        title: 'Failed',
                        icon: 'error',
                        text: data.error
                    });
                }
            }
            if (!data.error) {
                setFormData(initialFormState);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: data.message,
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            setIsPending(false);
            Swal.fire({
                title: 'Failed',
                icon: 'error',
                text: err
            });
            console.log(err);
        };
    
    };

    // Booking
    const submitBooking = async (e, type) => {

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${type}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            if (data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Booking Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (!data.error) {
                setIsPending(false);
                setBuddiesCount(0);
                
                if (type === 'with-guests') {
                    Swal.fire({
                        title: 'Booking Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>Congratulations <span style='font-weight: 700; color: var(--blue3);'>@${data.username}</span>!</p>
                        <br />
                        <p>${data.remarks}</p>
                        <p>See you at <span style='font-weight: 700; color: var(--blue3);'>${data.destination}</span> 😎</p>
                        <p>
                            (<span style='font-weight: 700;'>
                                Slots left: 
                            </span>
                            ${data.slots})
                        </p>
                        
                        `,
                        confirmButtonText: 'OK'
                    })
                } else if (type === 'with-friends') {
                    Swal.fire({
                        title: 'Booking Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>Congratulations <span style='font-weight: 700; color: var(--blue3);'>@${data.username}</span>!</p>
                        <p>${data.remarks}</p>
                        <p>See you at <span style='font-weight: 700; color: var(--blue3);'>${data.destination}</span> 😎</p>
                        `,
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Booking Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>Congratulations <span style='font-weight: 700; color: var(--blue3);'>@${data.username}</span>!</p>
                        <p>See you at <span style='font-weight: 700; color: var(--blue3);'>${data.destination}</span> 😎</p>
                        
                        `,
                        confirmButtonText: 'OK'
                    })
                }
                
                navigate('/users/profile');
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    };

    // Read Notifications
    const readNotifications = async (e, isAdmin) => {

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(
                isAdmin ?
                `${process.env.REACT_APP_API_URL}/users/admin/notifications/mark-read`
                :
                `${process.env.REACT_APP_API_URL}/users/profile/notifications/mark-read`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            if (data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (!data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Selected notification(s) are marked as Read!',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    
    };

    // Unread Notifications
    const unreadNotifications = async (e, isAdmin) => {

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(
                isAdmin ?
                `${process.env.REACT_APP_API_URL}/users/admin/notifications/mark-unread`
                :
                `${process.env.REACT_APP_API_URL}/users/profile/notifications/mark-unread`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            if (data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (!data.error) {
                setIsPending(false);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Selected notification(s) are marked as Unread!',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    
    };

    // Signup
    const signupUser = async (e) => {

        e.preventDefault();

        // Reset Errors
        usernameErr.textContent = '';
        emailErr.textContent = '';
        passwordErr.textContent = '';
        confirmPassworderr.textContent = '';
        
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            if (data.errors) {
                usernameErr.textContent = data.errors.username;
                emailErr.textContent = data.errors.email;
                if(data.errors.username) {console.log(data.errors.username)}
                if(data.errors.email) {console.log(data.errors.email)}
            }
            if (data.error) {
                const passwordErrContent = 'Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol'
                const confirmPassworderrContent = 'Passwords must match'
                switch (data.error) {
                    case passwordErrContent:
                        passwordErr.textContent = passwordErrContent;
                        break;
                    case confirmPassworderrContent:
                        confirmPassworderr.textContent = confirmPassworderrContent;
                        break;
                    default:
                        return null
                }
            }
            if (data.access) {

                await localStorage.setItem('token', data.access)
                Swal.fire({
                    title: 'Signup Success!',
                    icon: 'success',
                    html:
                    `<p style='margin: 0;'>Congratulations <span style='font-weight: 700; color: var(--blue3);'>@${data.username}</span>!</p>
                    <p style='margin: 0;'>${data.message}</p>`,
                    confirmButtonText: 'OK'
                });

                navigate('/users/profile')
            }
        }
        catch (err) {
            console.log(err);
        };

    };

    // Login
    const loginUser = async (e) => {

        // Reset Errors
        usernameErr.textContent = '';
        passwordErr.textContent = '';

        e.preventDefault();

        // if (isPending) {
        //     Swal.fire({
        //         title: 'Loading...',
        //         text: 'Please wait 😊', 
        //         didOpen: () => {
        //         Swal.showLoading();
        //         },
        //         allowOutsideClick: false,
        //         allowEscapeKey: false
        // });
        // } else {
        //     Swal.close();
        // }
        await setIsPending(false);
        
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            setIsPending(false);
            const data = await result.json();
            if (data.errors) {
                usernameErr.textContent = data.errors.username;
                passwordErr.textContent = data.errors.password;
            }
            if (data.access) {
                localStorage.setItem('token', data.access)
                Swal.fire({
                    title: 'Login Success!',
                    icon: 'success',
                    html:
                    `<p>Welcome back <span style='font-weight: 700; color: var(--blue3);'>@${data.username}</span>!</p>`,
                    didOpen: () => {
                        setTimeout(() => {
                        Swal.close();
                        }, 3000);
                    },
                });
                
                if (data.isAdmin) {
                    navigate('/users/admin');
                } else {
                    navigate('/users/profile');
                }
            }
        } catch (err) {
            console.log(err);
        };

    };

    // Experience
    const submitExperience = async (e) => {

        e.preventDefault();

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(`${process.env.REACT_APP_API_URL}/users/profile/tours-history/share-experience`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            
            setIsPending(false);
            
            if (data.error) {
                console.log(data)
                Swal.fire({
                    title: 'Failed to add experience',
                    icon: 'error',
                    text: data.message
                });
            }
            if (data.failed) {
                Swal.fire({
                    title: 'Failed to add experience',
                    icon: 'error',
                    text: data.failed
                });
            }
            if (data.success) {
                setFormData(initialFormState);
                Swal.fire({
                    title: 'Successfully Shared Experience!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    };

    // Activate/Archive Tour Package
    const toggleTourPackageStatus = async (e, status, setStatus, id) => {

        status ?
        setStatus(false)
        :
        setStatus(true)

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false
        });
        } else {
            Swal.close();
        }
          
        try {
            const result = await fetch(
                status ?
                `${process.env.REACT_APP_API_URL}/users/admin/${id}/archive`
                :
                `${process.env.REACT_APP_API_URL}/users/admin/${id}/activate`,
                {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await result.json();
            
            if (data.error) {
                setIsPending(false);
                console.log(data)
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (data.username) {
                setIsPending(false);
                if (status) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${data.username}, 
                            </span>
                            you have successfully archived a Tour Package!
                        </p>
                        `,
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${data.username}, 
                            </span>
                            you have successfully activated a Tour Package!
                        </p>
                        `,
                        confirmButtonText: 'OK'
                    })
                }
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };

    };

    // Top Destination Toggle
    const toggleTopDestination = async (e, status, setStatus, destination) => {

        status ?
        setStatus(false)
        :
        setStatus(true)

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false
        });
        } else {
            Swal.close();
        }
            
        try {
            const result = await fetch(
                status ?
                `${process.env.REACT_APP_API_URL}/users/admin/unset-top-destination`
                :
                `${process.env.REACT_APP_API_URL}/users/admin/set-top-destination`,
                {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({destination})
            });
            const data = await result.json();
            
            if (data.error) {
                setIsPending(false);
                console.log(data)
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (data.username) {
                setIsPending(false);
                if (status) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${data.username}, 
                            </span>
                            you have unset 
                            <span style='font-weight: 700; color: var(--blue3);'>
                                ${destination} 
                            </span>
                            from being a Top Destination!
                        </p>
                        `,
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${data.username}, 
                            </span>
                            you have successfully set 
                            <span style='font-weight: 700; color: var(--blue3);'>
                                ${destination} 
                            </span>
                            as a Top Destination!
                        </p>
                        `,
                        confirmButtonText: 'OK'
                    })
                }
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    };

    // Admin Toggle
    const toggleAdmin = async (e, status, setStatus, id) => {

        status ?
        setStatus(false)
        :
        setStatus(true)

        if (isPending) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait 😊', 
                didOpen: () => {
                Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false
        });
        } else {
            Swal.close();
        }
            
        try {
            const result = await fetch(
                status ?
                `${process.env.REACT_APP_API_URL}/users/admin/all-users/${id}/demote-admin`
                :
                `${process.env.REACT_APP_API_URL}/users/admin/all-users/${id}/make-admin`,
                {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await result.json();
            console.log(data)
            if (data.error) {
                setIsPending(false);
                console.log(data)
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: data.message
                });
            }
            if (data.username) {
                setIsPending(false);
                if (status) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${user.username}, 
                            </span>
                            you have demoted  
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${data.username} 
                            </span>
                            to a regular user!
                        </p>
                        `,
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        html: 
                        `
                        <p>
                            <span style='font-weight: 700; color: var(--blue3);'>
                                @${data.username} 
                            </span>
                            is now an admin!
                        </p>
                        `,
                        confirmButtonText: 'OK'
                    })
                }
            }
        } catch (err) {
            setIsPending(false);
            console.log(err);
        };
    };

    return {
        formData,
        buddiesCount,
        createTourPackage,
        updateTourPackage,
        changePassword,
        submitBooking,
        readNotifications,
        unreadNotifications,
        signupUser,
        loginUser,
        submitExperience,
        toggleTourPackageStatus,
        toggleTopDestination,
        toggleAdmin
    };
};

export default useHandleSubmit;
