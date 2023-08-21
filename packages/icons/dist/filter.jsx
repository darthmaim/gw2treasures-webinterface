import * as React from "react";
import { forwardRef } from "react";
const filter = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path stroke="currentColor" d="M14.798 1.507H1.202a.702.702 0 0 0-.496 1.199l5.648 5.648a.5.5 0 0 1 .146.353v4.525a.5.5 0 0 0 .223.416l2 1.334a.5.5 0 0 0 .777-.416V8.707a.5.5 0 0 1 .146-.353l5.648-5.648a.702.702 0 0 0-.496-1.2Z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(filter);
export default ForwardRef;