import * as React from "react";
import { forwardRef } from "react";
const status = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path fill="currentColor" fillRule="evenodd" d="M14.663 7a3.502 3.502 0 0 0-6.226-3.196.5.5 0 0 1-.874 0A3.5 3.5 0 0 0 1.337 7H.257A4.5 4.5 0 0 1 8 2.671 4.5 4.5 0 0 1 15.744 7h-1.08ZM4.102 10 8 13.802 11.898 10h1.433l-4.982 4.858a.5.5 0 0 1-.698 0L2.669 10h1.433Z" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M.5 8.5h3l2-3 2.5 5 2.5-4 2 2h3" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(status);
export default ForwardRef;