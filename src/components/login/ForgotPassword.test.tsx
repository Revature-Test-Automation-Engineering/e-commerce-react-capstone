import { render, screen } from "@testing-library/react"
import ReactDOM from 'react-dom'
import ForgotPassword from "./forgotPassword"

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

it('renders ForgotPassword without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<ForgotPassword></ForgotPassword>, div)
})