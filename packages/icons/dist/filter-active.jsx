import * as React from "react";
import { forwardRef } from "react";
const filter-active = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path fill="#000" fillRule="evenodd" d="M12.781 5.926 10 8.707v5.859a1 1 0 0 1-1.555.832l-2-1.333A1 1 0 0 1 6 13.232V8.707L.352 3.06a1.202 1.202 0 0 1 .85-2.052h9.132c-.147.31-.25.647-.3 1H1.202a.202.202 0 0 0-.143.345L6.707 8A1 1 0 0 1 7 8.707v4.525l2 1.334V8.707A1 1 0 0 1 9.293 8l2.464-2.464c.314.18.659.314 1.024.39Z" clipRule="evenodd" /><circle cx={13.5} cy={2.5} r={2.5} fill="#B7000D" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(filter-active);
export default ForwardRef;