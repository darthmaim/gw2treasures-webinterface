import * as React from "react";
import { forwardRef } from "react";
const builds = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path stroke="currentColor" d="M11 9.5a4.5 4.5 0 0 0 4.284-5.882c-.105-.325-.51-.391-.752-.15l-2.178 2.178a.5.5 0 0 1-.708 0l-1.292-1.292a.5.5 0 0 1 0-.708l2.179-2.178c.24-.241.174-.647-.15-.752a4.5 4.5 0 0 0-5.69 5.59L1.06 11.94a1.5 1.5 0 0 0 0 2.122l.878.878a1.5 1.5 0 0 0 2.122 0l5.632-5.632A4.5 4.5 0 0 0 11 9.5Z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(builds);
export default ForwardRef;