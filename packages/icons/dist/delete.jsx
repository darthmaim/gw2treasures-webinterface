import * as React from "react";
import { forwardRef } from "react";
const delete = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path stroke="currentColor" strokeLinecap="round" d="M1 2.5h1m13 0h-1m-8 0a2 2 0 1 1 4 0m-8 0 1.347 11.672a1.5 1.5 0 0 0 1.49 1.328h6.326a1.5 1.5 0 0 0 1.49-1.328L14 2.5m-12 0h12m-7.5 4v5m3 0v-5" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(delete);
export default ForwardRef;