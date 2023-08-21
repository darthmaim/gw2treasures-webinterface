import * as React from "react";
import { forwardRef } from "react";
const chatlink = (props, ref) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" ref={ref} {...props}><g clipPath="url(#a)"><path fill="currentColor" d="m10.635 11.86-.995-1.008a4.44 4.44 0 0 1-1.174.814c-.463.223-1.003.334-1.62.334-.837 0-1.521-.215-2.054-.644C4.264 10.922 4 10.296 4 9.478c0-.6.154-1.11.463-1.531.312-.422.75-.774 1.313-1.058-.293-.348-.501-.672-.625-.972a2.405 2.405 0 0 1-.185-.924c0-.64.208-1.132.625-1.476C6.01 3.172 6.53 3 7.153 3c.609 0 1.106.168 1.492.504.386.337.578.786.578 1.35 0 .473-.127.873-.381 1.197-.251.324-.781.668-1.591 1.033l2.406 2.418a3.63 3.63 0 0 0 .579-1.136c.115-.393.173-.865.173-1.416h.972c0 .624-.09 1.19-.272 1.696a5.33 5.33 0 0 1-.821 1.482L12 11.86h-1.365ZM6.69 6.506c.617-.239 1.033-.474 1.25-.705.215-.23.323-.518.323-.862 0-.385-.12-.663-.358-.833a1.258 1.258 0 0 0-.752-.261c-.367 0-.662.105-.885.316-.22.206-.33.486-.33.838 0 .272.063.523.19.754.128.227.315.478.562.753Zm2.337 3.713L6.349 7.497c-.378.182-.69.421-.938.717-.243.296-.364.705-.364 1.228 0 .526.172.931.515 1.215.347.284.777.425 1.29.425.47 0 .883-.08 1.238-.243.354-.166.667-.372.937-.62Z" /><path stroke="currentColor" strokeLinecap="round" d="M3.5.5H2A1.5 1.5 0 0 0 .5 2v12A1.5 1.5 0 0 0 2 15.5h1.5m9-15H14A1.5 1.5 0 0 1 15.5 2v12a1.5 1.5 0 0 1-1.5 1.5h-1.5" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath></defs></svg>;
const ForwardRef = forwardRef(chatlink);
export default ForwardRef;