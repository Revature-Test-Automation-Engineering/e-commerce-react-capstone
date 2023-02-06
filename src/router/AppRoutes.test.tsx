import { render, screen } from "@testing-library/react"
import ReactDOM from 'react-dom'
import { AppRoutes } from "./AppRoutes";

it('renders AppRoutes without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<AppRoutes />, div)
})