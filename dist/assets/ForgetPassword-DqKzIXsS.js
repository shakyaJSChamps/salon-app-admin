import{u,bt as j,bu as b,bv as f,j as e,Y as p,q as N,C as s,bw as v,bx as y}from"./index-DvAQHZBz.js";function S(){const n=u(),r={email:""},a=j().shape({email:b().email().required("Please enter your email")}),{values:o,errors:i,handleBlur:c,handleChange:m,handleSubmit:d,touched:x,isValid:t}=f({initialValues:r,validationSchema:a,onSubmit:async(l,{resetForm:g})=>{console.log("Values :: ",l);try{await a.validate(l),console.log("Validation passed"),g(),console.log("Navigating to /verification"),n("/verification")}catch(h){console.error("Validation error:",h.errors)}}});return e.jsxs(e.Fragment,{children:[e.jsx(p,{className:"p-0",children:e.jsxs(N,{className:"m-0 p-0",children:[e.jsx(s,{sm:8,className:"p-0 mt-4",children:e.jsx("img",{className:"d-logo ",src:v,alt:"d-logo.png"})}),e.jsx(s,{sm:4,className:"p-0 d-flex justify-content-center align-items-center mt-4",children:e.jsx("h6",{className:"sign-account back-sign",children:e.jsx(y,{to:"/login",className:"link-style",children:"Back to Sign In"})})}),e.jsx(s,{className:"p-0 mt-3",children:e.jsxs("h1",{className:"for-password",children:["Forgot ",e.jsx("br",{}),"Password"]})})]})}),e.jsx("div",{className:"main-form d-flex justify-content-center align-items-center",children:e.jsxs("form",{className:"form mt-3 mb-2 w-100",onSubmit:d,children:[e.jsxs("label",{className:"text Forget_text",children:["Enter your registered email address for the ",e.jsx("br",{}),"verification to get the 4 digits code.",e.jsx("br",{})]}),e.jsx("input",{className:"email-input mt-3",type:"email",name:"email",id:"email",placeholder:"EMAIL ADDRESS",value:o.email,onChange:m,onBlur:c}),i.email&&x.email&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("span",{className:"error text-danger small",children:i.email})]}),e.jsx("div",{className:"mt-4 mb-3 d-flex justify-content-center",children:e.jsx("button",{className:`forget_btn ${t?"":"disable"}`,type:"submit",disabled:!t,children:"Continue"})})]})})]})}export{S as default};
