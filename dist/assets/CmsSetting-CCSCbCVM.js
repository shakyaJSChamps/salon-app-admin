import{u as c,r as d,j as e,P as m,M as u}from"./index-DvAQHZBz.js";import{S as p}from"./SettingDropDown-IrUKIIQI.js";const j=()=>{const n=c(),[l,o]=d.useState(""),t=[{label:"Terms & Condition",value:""},{label:"CMS Setting",value:"option1",route:"/setting/cms-setting"},{label:"Setting",value:"option2",route:"/setting"}],i=r=>{const s=r.target.value;o(s),t.forEach(a=>{a.value===s&&n(a.route)})};return e.jsxs(m,{className:"add-service-paper px-3 h-100  rounded",elevation:3,children:[e.jsxs("div",{className:"d-flex align-items-center pt-2",children:[e.jsx(u,{}),e.jsx("p",{className:"ps-1 fw-bold mb-0",children:"CMS Setting"})]}),e.jsx("hr",{}),e.jsxs("form",{children:[e.jsx(p,{options:t,selectedValue:l,handleChange:i}),e.jsx("textarea",{className:"form-control input mt-3",rows:"15",cols:"40"}),e.jsx("div",{className:"d-flex justify-content-center align-items-center mt-4 mb-3",children:e.jsx("button",{type:"submit",className:"button ",children:"Update"})})]})]})};export{j as default};
