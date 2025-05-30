// import { useState } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Submitted:', { email, password });
//   };

//   return (
//     <div className="page login-page">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit} className="login-form">
//         <label>
//           Email:
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             placeholder="you@example.com"
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             placeholder="••••••"
//           />
//         </label>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
