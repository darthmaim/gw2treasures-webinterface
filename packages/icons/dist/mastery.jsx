import * as React from "react";
import { forwardRef } from "react";
const mastery = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path stroke="currentColor" strokeLinejoin="round" d="m8 1 1.011 5.394a2 2 0 0 0 2.86 1.42L12.5 7.5l-.82 1.265a2 2 0 0 0 .365 2.596L14.5 13.5l-1.842-.553c-1.438-.431-2.821.817-2.54 2.291l.051.267-1.138-.685a2 2 0 0 0-2.062 0l-1.138.685.05-.267c.282-1.474-1.1-2.722-2.539-2.29L1.5 13.5l2.433-2.158a2 2 0 0 0 .37-2.554L3.5 7.5l.628.314a2 2 0 0 0 2.86-1.42L8 1Z" /><circle cx={8} cy={11} r={1.5} stroke="currentColor" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(mastery);
export default ForwardRef;