import * as React from "react";
import { forwardRef } from "react";
const infusion-slot = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><circle cx={8} cy={8} r={7.5} stroke="currentColor" /><path stroke="currentColor" d="M10 3.5H6A1.5 1.5 0 0 0 4.5 5v4.086a1 1 0 0 0 .293.707l2.5 2.5a1 1 0 0 0 1.414 0l2.5-2.5a1 1 0 0 0 .293-.707V5A1.5 1.5 0 0 0 10 3.5Z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(infusion-slot);
export default ForwardRef;