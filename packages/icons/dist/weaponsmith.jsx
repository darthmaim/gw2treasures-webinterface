import * as React from "react";
import { forwardRef } from "react";
const weaponsmith = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path stroke="currentColor" strokeLinecap="round" d="M15 1.5h-1.293a.5.5 0 0 0-.353.146l-8.561 8.561a.414.414 0 0 1-.586 0 .414.414 0 0 0-.707.293v1.793a.5.5 0 0 1-.146.353l-1.5 1.5a.5.5 0 0 0 0 .707l.292.293a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 1 .353-.146H6.5a.414.414 0 0 0 .293-.707.414.414 0 0 1 0-.586l8.56-8.56a.5.5 0 0 0 .147-.354V2a.5.5 0 0 0-.5-.5Z" /><path stroke="currentColor" d="M4.5 5.5 3.354 6.646a.5.5 0 0 1-.708 0L.854 4.854a.5.5 0 0 1 0-.708l2.5-2.5a.5.5 0 0 1 .353-.146h3.586a.5.5 0 0 1 .353.854L6 4M4.5 5.5 6 7M4.5 5.5 6 4m0 0 1.5 1.5M9 10l3.25 3.25a1.06 1.06 0 0 0 1.5-1.5L10.5 8.5" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(weaponsmith);
export default ForwardRef;