import{j as e,P as a,bc as c,Y as r,q as m,C as n}from"./index-DvAQHZBz.js";import{I as l}from"./index.esm-BO8LMDLu.js";import{F as t,C as o}from"./FormControlLabel-GwBURcRQ.js";import{C as x,f as u}from"./CalendarNotification-CqB7IDiW.js";import{a as i}from"./index.esm-DKblCDgZ.js";import"./createSvgIcon-CY8wNGfL.js";import"./Stack-D792XGEW.js";import"./format-CU3NSzdY.js";const p=()=>e.jsxs(a,{className:"send-Notifi-first-paper px-3 h-100 pb-1 rounded",elevation:3,children:[e.jsxs("div",{className:"d-flex align-items-center pt-2",children:[e.jsx(l,{}),e.jsx("p",{className:"ps-1 fw-bold mb-0",children:"Send Notification"})]}),e.jsx("hr",{}),e.jsxs("form",{children:[e.jsxs("div",{className:"d-flex flex-column align-items-start mb-1",children:[e.jsx("label",{className:"fw-bold",children:"Notification Text"}),e.jsx("textarea",{className:"form-control input mt-3",rows:"9",cols:"35"})]}),e.jsxs("div",{className:"d-flex flex-column align-items-start mb-1 ps-3",children:[e.jsx("label",{className:"mt-3",children:"Select User Type"}),e.jsx(t,{control:e.jsx(o,{id:"all-consumer"}),label:"All Consumer"}),e.jsx(t,{control:e.jsx(o,{id:"all-saloon"}),label:"All Saloon"}),e.jsx(t,{control:e.jsx(o,{id:"all-freelance"}),label:"All Freelance"})]}),e.jsx("div",{className:"d-flex justify-content-center",children:e.jsx("button",{type:"submit",className:"button mt-2",children:"Send"})})]})]}),j=()=>{const d=[{id:1,receivedAmount:1e3,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",timeAgo:new Date,icon:e.jsx(i,{})},{id:2,receivedAmount:2e3,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",timeAgo:new Date(Date.now()-36e5),icon:e.jsx(i,{})},{id:3,receivedAmount:3e3,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",timeAgo:new Date(Date.now()-72e5),icon:e.jsx(i,{})},{id:4,receivedAmount:4e3,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",timeAgo:new Date(Date.now()-108e5),icon:e.jsx(i,{})},{id:5,receivedAmount:5e3,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",timeAgo:new Date(Date.now()-144e5),icon:e.jsx(i,{})},{id:6,receivedAmount:6e3,content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",timeAgo:new Date(Date.now()-18e6),icon:e.jsx(i,{})}];return e.jsxs(a,{className:"send-Notifi-first-paper px-3 h-100 rounded",elevation:3,children:[e.jsxs("div",{className:"d-flex align-items-center pt-2",children:[e.jsx(l,{}),e.jsx("p",{className:"ps-1 fw-bold mb-0",children:"Send Notification"}),e.jsxs("div",{className:"d-flex flex-grow-1 justify-content-end align-items-center me-5 ",children:[e.jsx("p",{className:"ps-1 fw-bold mb-0",children:"Today"}),e.jsx(x,{})]})]}),e.jsx("hr",{}),d.map(s=>e.jsxs("div",{className:"send-notification mt-3",children:[e.jsx("div",{children:e.jsx("div",{className:"send-notification-icon mx-2",children:s.icon})}),e.jsxs("div",{className:"send-notification-content ps-2",children:[e.jsxs("p",{className:"ps-1 pt-3  fw-bold mb-0",children:["Received",e.jsxs("span",{children:[e.jsx(c,{}),s.receivedAmount]})]}),e.jsx("p",{className:"para-section",children:s.content})]}),e.jsx("span",{className:"send-span fw-bold",children:u(s.timeAgo,{addSuffix:!0})})]},s.id))]})},D=()=>e.jsx(r,{children:e.jsxs(m,{children:[e.jsx(n,{md:4,children:e.jsx(p,{})}),e.jsx(n,{md:8,children:e.jsx(j,{})})]})});export{D as default};
