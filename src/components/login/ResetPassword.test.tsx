import { render, screen } from "@testing-library/react"
import ReactDOM from 'react-dom'
import ResetPassword from "./resetPassword";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it('renders ResetPassword without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<ResetPassword></ResetPassword>, div)
})