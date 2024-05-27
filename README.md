# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



   // const requestOptions = {
                                                //     method: 'POST',
                                                //     headers: { 'Content-Type': 'application/json' },
                                                //     body: JSON.stringify({ username: values.username, email: values.email, password: values.password, confirm_password: values.confirm_password })
                                                // };
                                                // const response = await fetch('http://127.0.0.1:8000/signup', requestOptions);
                                                // const data = await response.json();
                                                // console.log(data);
                                                // if (data.success) {
                                                //     toast.success(data.success, {
                                                //         position: "bottom-right", theme: "dark"
                                                //     });
                                                //     action.resetForm();
                                                // } else {
                                                //     toast.error(data.error.email[0] ? data.error.email[0] : "Something Went Wrong", {
                                                //         position: "bottom-right", theme: "dark"
                                                //     });
                                                // }