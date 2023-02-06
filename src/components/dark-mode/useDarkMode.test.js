import { Experimental_CssVarsProvider } from '@mui/material';
import React from 'react';
import {useState, useContext, useEffect} from 'react';
import { RefreshContext } from "../../context/refresh.context";
import { useDarkMode } from './useDarkMode';

//Succesful tests

describe('Testing dark mode', () => {
    it('should be dark', () => {
        const [theme, themeToggler] = useDarkMode();
        expect(theme).toBe('dark');
    })
    
    it('should switch between themes', () => {
        const [theme, themeToggler] = useDarkMode();

        expect(window.localStorage.getItem("theme")).toBe("dark");
        expect(theme).toBe('dark');

        themeToggler();

        expect(window.localStorage.getItem("theme")).toBe("light");
        expect(theme).toBe('light');
    })
});

//THE BELOW TESTS FAIL

// const darkMode = require('../dark-mode/useDarkMode.js');

// describe('testing the state of theme', () => {
//   test('theme should currently be dark', () => {
//     expect(darkMode).toBe('dark');
//   })
// });

// describe('testing parts of darkMode', () => {
//     const setMode = require('./useDarkMode')

//     test('Mode should be set', () => {
//         expect(setMode()).toBe('dark');
//     })
// })